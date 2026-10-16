import * as THREE from 'three';

const MAX_ANGULAR_SPEED = 0.85;

/**
 * Manages camera framing, smoothly damped pointer parallax,
 * constrained click-and-drag viewing angle adjustments, inertial slowdown,
 * and automatic return to the reference landscape composition.
 */
export class SculptureController {
  constructor({ cameraFraming, parallaxStrength, reducedMotion = false }) {
    this.framing = cameraFraming;
    this.parallax = parallaxStrength;
    this.reducedMotion = reducedMotion;

    this.state = 'idle'; // idle | drag | inertia | hold | return
    this.time = 0;
    this.lastInteraction = 0;
    this.lastMoveTime = 0;

    this.basePos = new THREE.Vector3(...(cameraFraming.positionDesktop || [-1.4, 8.8, 20.5]));
    this.baseTarget = new THREE.Vector3(...(cameraFraming.targetDesktop || [1.6, 0.9, -16.0]));

    // Normalized pointer coordinates [-1, 1] and smoothed current parallax
    this.targetPointer = new THREE.Vector2(0, 0);
    this.currentPointer = new THREE.Vector2(0, 0);

    // Constrained drag viewing angle offsets (yaw, pitch in radians)
    this.dragAngles = new THREE.Vector2(0, 0);
    this.velocity = new THREE.Vector2(0, 0);

    // Output camera vectors
    this.cameraPos = new THREE.Vector3().copy(this.basePos);
    this.cameraTarget = new THREE.Vector3().copy(this.baseTarget);

    this._offset = new THREE.Vector3();
    this._Spherical = new THREE.Spherical();
  }

  setViewportMode(isDesktop) {
    const pos = isDesktop
      ? this.framing.positionDesktop || [-1.4, 8.8, 20.5]
      : this.framing.positionMobile || [0.8, 9.6, 22.5];
    const tgt = isDesktop
      ? this.framing.targetDesktop || [1.6, 0.9, -16.0]
      : this.framing.targetMobile || [1.2, 0.6, -16.0];

    this.basePos.set(pos[0], pos[1], pos[2]);
    this.baseTarget.set(tgt[0], tgt[1], tgt[2]);
  }

  /* ---------- Pointer Parallax ---------- */

  setPointer(nx, ny) {
    if (this.reducedMotion) return;
    this.targetPointer.set(
      THREE.MathUtils.clamp(nx, -1, 1),
      THREE.MathUtils.clamp(ny, -1, 1)
    );
  }

  clearPointer() {
    this.targetPointer.set(0, 0);
  }

  /* ---------- Constrained Drag Viewing Angle ---------- */

  beginDrag(now) {
    this.velocity.set(0, 0);
    this.state = 'drag';
    this.lastInteraction = now;
    this.lastMoveTime = now;
  }

  dragBy(dx, dy, now) {
    if (this.state !== 'drag') return;
    const sens = this.parallax.dragSensitivity || 0.0018;

    // Soft-resistance near the angle boundaries so dragging feels cushioned
    const maxYaw = this.parallax.maxYaw || 0.18;
    const maxPitchUp = this.parallax.maxPitchUp || 0.12;
    const maxPitchDown = this.parallax.maxPitchDown || 0.07;

    const yawResistance = 1.0 - 0.65 * Math.pow(Math.min(1.0, Math.abs(this.dragAngles.x) / maxYaw), 2);
    const pitchResistance = 1.0 - 0.65 * Math.pow(Math.min(1.0, Math.abs(this.dragAngles.y) / maxPitchUp), 2);

    const dYaw = -dx * sens * yawResistance;
    const dPitch = dy * sens * pitchResistance;

    this.dragAngles.x = THREE.MathUtils.clamp(this.dragAngles.x + dYaw, -maxYaw, maxYaw);
    this.dragAngles.y = THREE.MathUtils.clamp(this.dragAngles.y + dPitch, -maxPitchDown, maxPitchUp);

    const dt = Math.max((now - this.lastMoveTime) / 1000, 1 / 240);
    this.velocity.x = THREE.MathUtils.lerp(this.velocity.x, dYaw / dt, 0.4);
    this.velocity.y = THREE.MathUtils.lerp(this.velocity.y, dPitch / dt, 0.4);
    this.velocity.clampLength(0, MAX_ANGULAR_SPEED);

    this.lastMoveTime = now;
    this.lastInteraction = now;
  }

  endDrag(now) {
    if (this.state !== 'drag') return;
    if (now - this.lastMoveTime > 90 || this.reducedMotion) {
      this.velocity.set(0, 0);
    }
    this.state = this.velocity.lengthSq() > 0.0001 ? 'inertia' : 'hold';
    this.lastInteraction = now;
  }

  /* ---------- Per-Frame Update ---------- */

  update(dt, now) {
    const rm = this.reducedMotion;
    this.time += dt;

    const maxYaw = this.parallax.maxYaw || 0.18;
    const maxPitchUp = this.parallax.maxPitchUp || 0.12;
    const maxPitchDown = this.parallax.maxPitchDown || 0.07;

    switch (this.state) {
      case 'inertia': {
        const decay = Math.exp(-(this.parallax.inertiaDamping || 3.5) * dt);
        this.velocity.multiplyScalar(decay);
        this.dragAngles.x = THREE.MathUtils.clamp(
          this.dragAngles.x + this.velocity.x * dt,
          -maxYaw,
          maxYaw
        );
        this.dragAngles.y = THREE.MathUtils.clamp(
          this.dragAngles.y + this.velocity.y * dt,
          -maxPitchDown,
          maxPitchUp
        );
        if (this.velocity.lengthSq() < 0.00008) {
          this.state = 'hold';
          this.lastInteraction = now;
        }
        break;
      }

      case 'hold': {
        const delay = this.parallax.returnDelayMs ?? 2200;
        if (now - this.lastInteraction > delay) {
          this.state = 'return';
        }
        break;
      }

      case 'return': {
        const t = 1.0 - Math.exp(-(this.parallax.returnSpeed || 1.5) * dt);
        this.dragAngles.lerp(new THREE.Vector2(0, 0), t);
        if (this.dragAngles.lengthSq() < 0.00001) {
          this.dragAngles.set(0, 0);
          this.state = 'idle';
        }
        break;
      }

      default:
        break;
    }

    // Smoothly damp pointer parallax
    const damp = 1.0 - Math.exp(-(this.parallax.dampingSpeed || 3.8) * dt);
    this.currentPointer.lerp(this.targetPointer, damp);

    // Compute orbital offset around baseTarget within constrained angles
    this._offset.copy(this.basePos).sub(this.baseTarget);
    this._Spherical.setFromVector3(this._offset);

    this._Spherical.theta += this.dragAngles.x;
    this._Spherical.phi = THREE.MathUtils.clamp(
      this._Spherical.phi - this.dragAngles.y,
      0.35,
      Math.PI * 0.46
    );

    this._offset.setFromSpherical(this._Spherical);
    this.cameraPos.copy(this.baseTarget).add(this._offset);

    // Subtle idle camera breathing when not reducedMotion
    const breathX = rm ? 0.0 : Math.sin(this.time * 0.28) * 0.16;
    const breathY = rm ? 0.0 : Math.cos(this.time * 0.22) * 0.07;

    // Apply pointer parallax
    const px = this.currentPointer.x * (this.parallax.hoverPositionX ?? 0.75);
    const py = this.currentPointer.y * (this.parallax.hoverPositionY ?? 0.35);

    this.cameraPos.x += px + breathX;
    // Prevent camera from ever dipping close to or beneath the foreground terrain
    this.cameraPos.y = Math.max(3.6, this.cameraPos.y + py + breathY);

    const tx = this.currentPointer.x * (this.parallax.hoverTargetX ?? 0.45);
    const ty = this.currentPointer.y * (this.parallax.hoverTargetY ?? 0.20);

    this.cameraTarget.set(
      this.baseTarget.x + tx + breathX * 0.35,
      this.baseTarget.y + ty,
      this.baseTarget.z
    );

    const parallaxMoving =
      this.currentPointer.distanceToSquared(this.targetPointer) > 0.0001;
    return !rm || this.state !== 'idle' || parallaxMoving;
  }

  applyToCamera(camera) {
    camera.position.copy(this.cameraPos);
    camera.lookAt(this.cameraTarget);
  }
}
