import * as THREE from 'three';

/**
 * Ferrofluid Pickup (prototype): a pool of gloss-black magnetic fluid over the six pole
 * pieces of a guitar pickup.
 *
 * The surface is a height field evaluated on the GPU: each pole raises a smooth mound, and
 * where the field is strong enough the fluid breaks into a hexagonal crown of spikes (the
 * Rosensweig instability). Normals are derived per pixel from the same height function, so
 * the spikes stay sharp. The fluid itself is black: everything visible is the reflection of
 * three studio softboxes (violet, cyan and a faint bone key). Motion is quiet: the poles
 * breathe at slightly different rates, a slow strum travels across the row, and the mouse
 * acts as a seventh magnet.
 */

const POLE_COUNT = 6;

const SURFACE = `
  #define POLES ${POLE_COUNT}
  uniform vec3 uPoles[POLES];   // x, z, strength
  uniform vec3 uPointer;        // x, z, strength
  uniform vec4 uField;          // pole radius, pointer radius, spike threshold, lattice spacing
  uniform vec3 uShape;          // mound height, spike height, spike sharpness
  uniform float uTime;

  float fieldAt(vec2 p) {
    float b = 0.0;
    float inv = 1.0 / (uField.x * uField.x);
    for (int i = 0; i < POLES; i++) {
      vec2 d = p - uPoles[i].xy;
      b += uPoles[i].z * exp(-dot(d, d) * inv);
    }
    vec2 dp = p - uPointer.xy;
    b += uPointer.z * exp(-dot(dp, dp) / (uField.y * uField.y));
    return b;
  }

  // Offset from the nearest centre of a unit hexagonal lattice.
  vec2 hexOffset(vec2 q) {
    const vec2 r = vec2(1.0, 1.7320508);
    vec2 a = mod(q, r) - r * 0.5;
    vec2 b = mod(q - r * 0.5, r) - r * 0.5;
    return dot(a, a) < dot(b, b) ? a : b;
  }

  float cellHash(vec2 id) { return fract(sin(dot(id, vec2(127.1, 311.7))) * 43758.5453); }

  // Returns (height, occlusion).
  vec2 surfaceAt(vec2 p) {
    float b = fieldAt(p);
    float h = uShape.x * b / (1.0 + 0.45 * b);
    // Faint swell so the mirror-flat pool never looks frozen.
    h += 0.006 * sin(p.x * 3.1 + uTime * 0.6) * sin(p.y * 2.7 - uTime * 0.45);
    float occ = 1.0;
    if (b > uField.z * 0.3) {
      // Each magnet grows its own crown: the lattice is centred on whichever source (a pole
      // or the mouse) dominates here, so one spike always stands exactly on the magnet.
      vec2 dm = p - uPointer.xy;
      vec3 src = uPointer;
      float rad = uField.y;
      float best = uPointer.z * exp(-dot(dm, dm) / (rad * rad));
      float inv = 1.0 / (uField.x * uField.x);
      for (int i = 0; i < POLES; i++) {
        vec2 d = p - uPoles[i].xy;
        float f = uPoles[i].z * exp(-dot(d, d) * inv);
        if (f > best) {
          best = f;
          src = uPoles[i];
          rad = uField.x;
        }
      }
      vec2 q = (p - src.xy) / uField.w;
      vec2 g = hexOffset(q);
      vec2 cq = q - g;
      vec2 dc = cq * uField.w;
      float bc = src.z * exp(-dot(dc, dc) / (rad * rad));
      float amp = smoothstep(uField.z, uField.z + 0.75, bc);
      vec2 id = vec2(floor(cq.x * 2.0 + 0.5), floor(cq.y / 0.8660254 + 0.5));
      amp *= 0.88 + 0.12 * sin(uTime * 1.1 + cellHash(id) * 6.2832);
      // Concave cone with a very slightly rounded tip.
      float d = sqrt(dot(g, g) + 0.0008);
      float cone = pow(max(0.0, 1.0 - d / 0.56), uShape.z);
      h += amp * uShape.y * (0.6 + 0.4 * min(bc, 1.5)) * cone;
      occ = 1.0 - amp * (1.0 - cone) * 0.78;
    }
    return vec2(h, occ);
  }
`;

const VERTEX = `
  ${SURFACE}
  varying vec2 vP;

  void main() {
    vP = position.xz;
    float h = surfaceAt(vP).x;
    gl_Position = projectionMatrix * viewMatrix * vec4(position.x, h, position.z, 1.0);
  }
`;

const FRAGMENT = `
  ${SURFACE}
  uniform vec3 uViolet;
  uniform vec3 uCyan;
  uniform vec3 uBone;
  uniform vec4 uLights;   // violet, cyan, bone intensity, exposure
  uniform vec2 uCentre;
  uniform vec2 uPool;     // pool fade radius in x and z
  uniform float uCalm;
  uniform float uHorizon;
  uniform float uReflect;
  varying vec2 vP;

  // A rectangular studio softbox centred on direction c (halfU wide, halfV tall).
  float softbox(vec3 d, vec3 c, float halfU, float halfV) {
    float f = dot(d, c);
    if (f <= 0.0) return 0.0;
    vec3 u = normalize(cross(c, vec3(0.0, 1.0, 0.0)));
    vec3 v = cross(u, c);
    float pu = dot(d, u) / f;
    float pv = dot(d, v) / f;
    return smoothstep(halfU, halfU * 0.6, abs(pu)) * smoothstep(halfV, halfV * 0.45, abs(pv));
  }

  vec3 environment(vec3 d) {
    vec3 left = normalize(vec3(-0.8, 0.42, 0.3));
    vec3 right = normalize(vec3(0.85, 0.4, 0.15));
    vec3 top = normalize(vec3(0.05, 0.86, -0.4));
    // Broad, dim fills so every spike has a violet flank and a cyan flank.
    vec3 col = uViolet * uLights.x * 0.16 * pow(max(dot(d, left), 0.0), 3.0);
    col += uCyan * uLights.y * 0.13 * pow(max(dot(d, right), 0.0), 3.0);
    // Crisp softbox strips riding on top of the fills.
    col += uViolet * uLights.x * softbox(d, left, 1.0, 0.2);
    col += uCyan * uLights.y * softbox(d, right, 0.8, 0.15);
    col += uBone * uLights.z * softbox(d, top, 0.55, 0.1);
    // A low glow behind the pool: the flat fluid mirrors it and the spikes cut into it.
    float horizon = exp(-pow((d.y - 0.24) / 0.15, 2.0)) * smoothstep(0.1, -0.7, d.z);
    col += mix(uViolet, uCyan, smoothstep(-0.5, 0.6, d.x)) * uHorizon * horizon;
    return col;
  }

  void main() {
    vec2 s = surfaceAt(vP);
    float e = 0.005;
    float hx = surfaceAt(vP + vec2(e, 0.0)).x;
    float hz = surfaceAt(vP + vec2(0.0, e)).x;
    vec3 n = normalize(vec3(s.x - hx, e, s.x - hz));

    vec3 world = vec3(vP.x, s.x, vP.y);
    vec3 v = normalize(cameraPosition - world);
    float nv = max(dot(n, v), 0.0);
    float fresnel = uReflect + (1.0 - uReflect) * pow(1.0 - nv, 5.0);

    vec3 col = environment(reflect(-v, n)) * fresnel * s.y;
    col = 1.0 - exp(-col * uLights.w);

    // The pool fades into the void well before the mesh ends.
    float fade = 1.0 - smoothstep(0.5, 1.0, length((vP - uCentre) / uPool));
    col *= fade * (1.0 - uCalm * 0.65);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToVec3(hex) {
  const v = parseInt(hex.replace('#', ''), 16);
  return new THREE.Vector3(((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255);
}

export function mountFerrofluidScene(container, settings, { reducedMotion, coarsePointer, onReady, onError }) {
  const { pickup, fluid, pointer: ptr, palette, lights, camera: cam, rendering } = settings;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    premultipliedAlpha: true,
    powerPreference: coarsePointer ? 'default' : 'high-performance',
  });
  renderer.setClearColor(0x000000, 0);
  const maxDpr = coarsePointer ? rendering.maxPixelRatioMobile : rendering.maxPixelRatioDesktop;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

  const canvas = renderer.domElement;
  canvas.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none';
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(cam.fovDesktop, 1, 0.5, 100);

  const [segX, segZ] = coarsePointer ? fluid.segmentsMobile : fluid.segmentsDesktop;
  const geometry = new THREE.PlaneGeometry(fluid.planeSize[0], fluid.planeSize[1], segX, segZ);
  geometry.rotateX(-Math.PI / 2);

  const poles = Array.from({ length: POLE_COUNT }, () => new THREE.Vector3());
  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uPoles: { value: poles },
      uPointer: { value: new THREE.Vector3(0, 0, 0) },
      uField: { value: new THREE.Vector4(pickup.poleRadius, ptr.radius, fluid.spikeThreshold, fluid.latticeSpacing) },
      uShape: { value: new THREE.Vector3(fluid.moundHeight, fluid.spikeHeight, fluid.spikeSharpness) },
      uViolet: { value: hexToVec3(palette.violet) },
      uCyan: { value: hexToVec3(palette.cyan) },
      uBone: { value: hexToVec3(palette.bone) },
      uLights: { value: new THREE.Vector4(lights.violet, lights.cyan, lights.bone, lights.exposure) },
      uCentre: { value: new THREE.Vector2() },
      uPool: { value: new THREE.Vector2(...fluid.poolRadius) },
      uCalm: { value: 0 },
      uHorizon: { value: lights.horizon },
      uReflect: { value: lights.reflectance },
    },
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  /* ---------- Layout, camera & pointer magnet ---------- */
  const basePos = new THREE.Vector3();
  const baseTarget = new THREE.Vector3();
  const centre = new THREE.Vector2();
  const ray = new THREE.Vector3();
  // nx/ny: eased screen position for parallax. mx/mz: magnet position on the fluid plane.
  const pointer = { nx: 0, ny: 0, tnx: 0, tny: 0, mx: 0, mz: 0, strength: 0, active: false, placed: false };
  let width = 0, height = 0;

  const layout = () => {
    const rect = container.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    const desktop = width >= 1024;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = desktop ? cam.fovDesktop : cam.fovMobile;
    camera.updateProjectionMatrix();
    basePos.fromArray(desktop ? cam.positionDesktop : cam.positionMobile);
    baseTarget.fromArray(desktop ? cam.targetDesktop : cam.targetMobile);
    centre.fromArray(desktop ? pickup.centreDesktop : pickup.centreMobile);
    material.uniforms.uCentre.value.copy(centre);
    mesh.position.set(0, 0, 0);
    // The mesh stays at the origin (the shader works in world xz); shift its vertices instead.
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    geometry.translate(centre.x - (box.min.x + box.max.x) / 2, 0, centre.y - (box.min.z + box.max.z) / 2);
  };

  const updatePoles = (t) => {
    const cos = Math.cos(pickup.angle);
    const sin = Math.sin(pickup.angle);
    // A strum: one pulse travelling across the six poles every few seconds.
    const sweep = ((t % pickup.strumEvery) / pickup.strumSeconds) * (POLE_COUNT + 1) - 1;
    for (let i = 0; i < POLE_COUNT; i++) {
      const along = (i - (POLE_COUNT - 1) / 2) * pickup.spacing;
      let strength = pickup.strength;
      if (!reducedMotion) {
        strength += pickup.breath * Math.sin(t * pickup.breathSpeed * (1 + i * 0.13) + i * 1.7);
        strength += pickup.strumStrength * Math.exp(-((sweep - i) ** 2) / 0.6);
      }
      poles[i].set(centre.x + along * cos, centre.y + along * sin, strength);
    }
  };

  const placeCamera = () => {
    camera.position.set(
      basePos.x + pointer.nx * cam.parallax[0],
      basePos.y + pointer.ny * cam.parallax[1],
      basePos.z
    );
    camera.lookAt(baseTarget);
    camera.updateMatrixWorld();
  };

  // Where the mouse ray meets the fluid plane.
  const updateMagnet = (dt) => {
    let target = 0;
    if (pointer.active) {
      ray.set(pointer.tnx, pointer.tny, 0.5).unproject(camera).sub(camera.position).normalize();
      if (ray.y < -0.02) {
        const t = (ptr.height - camera.position.y) / ray.y;
        const x = camera.position.x + ray.x * t;
        const z = camera.position.z + ray.z * t;
        if (!pointer.placed) {
          pointer.mx = x;
          pointer.mz = z;
          pointer.placed = true;
        }
        const k = 1 - Math.exp(-dt * ptr.follow);
        pointer.mx += (x - pointer.mx) * k;
        pointer.mz += (z - pointer.mz) * k;
        target = ptr.strength;
      }
    }
    pointer.strength += (target - pointer.strength) * (1 - Math.exp(-dt * 3));
    if (pointer.strength < 0.002 && !pointer.active) pointer.placed = false;
    material.uniforms.uPointer.value.set(pointer.mx, pointer.mz, pointer.strength);
  };

  /* ---------- Loop ---------- */
  const hero = document.querySelector('#main-content section');
  const rootEl = container.closest('[data-theme]') || container.parentElement || container;
  let rafId = 0, lastTime = 0, elapsed = 0, disposed = false, readySent = false, inHero = true;
  const minFrameMs = 1000 / (coarsePointer ? rendering.mobileFps : rendering.desktopFps) - 1;

  const render = (dt = 0) => {
    material.uniforms.uTime.value = elapsed;
    material.uniforms.uCalm.value = parseFloat(getComputedStyle(rootEl).getPropertyValue('--section-calm') || '0');
    updatePoles(elapsed);
    placeCamera();
    updateMagnet(dt);
    renderer.render(scene, camera);
    if (!readySent) {
      readySent = true;
      onReady?.();
    }
  };

  const frame = (now) => {
    rafId = 0;
    if (disposed || document.hidden || !inHero) return;
    if (lastTime && now - lastTime < minFrameMs) {
      rafId = requestAnimationFrame(frame);
      return;
    }
    const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
    lastTime = now;
    elapsed += dt;
    const k = 1 - Math.exp(-dt * 2.5);
    pointer.nx += (pointer.tnx - pointer.nx) * k;
    pointer.ny += (pointer.tny - pointer.ny) * k;
    try {
      render(dt);
    } catch (error) {
      dispose();
      onError?.(error);
      return;
    }
    rafId = requestAnimationFrame(frame);
  };

  const requestFrame = () => {
    if (reducedMotion || disposed || document.hidden || !inHero || rafId) return;
    lastTime = 0;
    rafId = requestAnimationFrame(frame);
  };
  const stop = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  };

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    pointer.tnx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
    pointer.tny = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
    pointer.active = true;
  };
  const clearPointer = () => {
    pointer.tnx = 0;
    pointer.tny = 0;
    pointer.active = false;
  };
  const onVisibility = () => (document.hidden ? stop() : requestFrame());
  const onScroll = () => {
    const rect = hero?.getBoundingClientRect();
    inHero = !rect || rect.bottom > height * 0.15;
    if (inHero) requestFrame();
    else stop();
  };
  const onContextLost = (e) => {
    e.preventDefault();
    stop();
    onError?.(new Error('WebGL context lost'));
  };

  const ro = new ResizeObserver(() => {
    try {
      layout();
      if (reducedMotion) render();
    } catch (error) {
      dispose();
      onError?.(error);
    }
  });

  function dispose() {
    if (disposed) return;
    disposed = true;
    stop();
    ro.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('blur', clearPointer);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('mouseleave', clearPointer);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss?.();
    canvas.remove();
  }

  try {
    layout();
    ro.observe(container);
    if (hero) ro.observe(hero);
    canvas.addEventListener('webglcontextlost', onContextLost);
    if (reducedMotion) {
      render();
    } else {
      if (!coarsePointer) {
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('blur', clearPointer);
        document.addEventListener('mouseleave', clearPointer);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      onScroll();
    }
  } catch (error) {
    dispose();
    throw error;
  }

  return dispose;
}
