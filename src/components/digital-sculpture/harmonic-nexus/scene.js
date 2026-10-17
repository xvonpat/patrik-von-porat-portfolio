import * as THREE from 'three';
import { SculptureController } from '../interaction';

/**
 * Harmonic Nexus — Real-Time 3D Cymatic Strings & Attractor Sculpture.
 *
 * Designed specifically for Patrik von Porat's creative identity:
 * - Music & Guitar (35+ years): Standing-wave harmonic strings, polyphonic overtones,
 *   and interactive pointer "plucking" resonance.
 * - Visual Art: Fine sculptural linework, stippled luminous particles, and deep chiaroscuro
 *   around an Obsidian Noir core.
 * - Systems Thinking (Observe → Structure → Create → Refine): Four-phase harmonic attractor
 *   streams and structured mathematical topology.
 */

function createRng(seed = 4099) {
  let s = seed >>> 0;
  return function rand() {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Evaluates a 3D harmonic curve point for a given string family.
 */
function sampleHarmonicCurve(family, u, strandIdx, totalStrands, phaseOffset, radiusScale) {
  const theta = u * Math.PI * 2.0;

  if (family === 0) {
    // Family 0: Toroidal Lissajous / Möbius Harmonic Weave (p=2, q=3 resonance)
    const strandFrac = strandIdx / Math.max(1, totalStrands);
    const phi = strandFrac * Math.PI * 2.0 + phaseOffset;
    const majorR = (1.62 + 0.22 * Math.cos(3.0 * theta + phi)) * radiusScale;
    const minorR = (0.46 + 0.16 * Math.sin(2.0 * theta - phi * 0.5)) * radiusScale;
    const twist = 1.5 * theta + phi;

    const x = (majorR + minorR * Math.cos(twist)) * Math.cos(theta);
    const y = (majorR + minorR * Math.cos(twist)) * Math.sin(theta);
    const z = minorR * Math.sin(twist) + 0.28 * Math.sin(3.0 * theta + phi) * radiusScale;
    return new THREE.Vector3(x, y, z);
  }

  if (family === 1) {
    // Family 1: Taut Resonant Guitar / Harp Strings spanning hyperbolic chords across the rim
    const chordAngle = (strandIdx / Math.max(1, totalStrands)) * Math.PI * 2.0 + phaseOffset;
    const spanAngle = 1.18 + 0.42 * Math.sin(strandIdx * 1.7 + phaseOffset);
    const a0 = chordAngle - spanAngle;
    const a1 = chordAngle + spanAngle;

    const rRing = (1.28 + (strandIdx % 5) * 0.12) * radiusScale;
    const p0x = Math.cos(a0) * rRing;
    const p0y = Math.sin(a0) * rRing;
    const p1x = Math.cos(a1) * rRing;
    const p1y = Math.sin(a1) * rRing;

    // Smooth hyperbolic arch bowing outward around the dark obsidian core
    const s = u;
    const arch = Math.sin(s * Math.PI);
    const midAngle = chordAngle;
    const bowR = (1.16 + 0.34 * ((strandIdx % 3) * 0.5)) * radiusScale;
    const cx = Math.cos(midAngle) * bowR;
    const cy = Math.sin(midAngle) * bowR;

    const omt = 1.0 - s;
    const x = omt * omt * p0x + 2.0 * omt * s * cx + s * s * p1x;
    const y = omt * omt * p0y + 2.0 * omt * s * cy + s * s * p1y;
    const z = arch * (0.36 * Math.cos(strandIdx * 0.9 + phaseOffset)) * radiusScale;
    return new THREE.Vector3(x, y, z);
  }

  // Family 2: Sweeping Outer Attractor Filaments (4-phase Observe → Structure → Create → Refine)
  const arm = strandIdx % 4;
  const armBaseAngle = arm * (Math.PI * 0.5) + phaseOffset;
  const spiralAngle = armBaseAngle + (u - 0.5) * Math.PI * 1.65;
  const r = (1.32 + Math.pow(u, 0.85) * 1.48 + 0.14 * Math.sin(u * Math.PI * 4.0 + strandIdx)) * radiusScale;
  const x = Math.cos(spiralAngle) * r;
  const y = Math.sin(spiralAngle) * r;
  const z = (Math.sin(u * Math.PI * 2.0 + arm) * 0.42) * radiusScale;
  return new THREE.Vector3(x, y, z);
}

/**
 * Builds the 3D Harmonic Strings LineSegments geometry, Cymatic Particle Points geometry,
 * Obsidian Core mesh geometry, and Atmospheric Caustic Halo plane.
 */
function createHarmonicNexusGeometries({ isMobile, settings }) {
  const geomCfg = settings.nexusGeometry || {};
  const radiusScale = isMobile ? (geomCfg.scaleMobile || 0.72) : (geomCfg.scaleDesktop || 1.0);
  const rand = createRng(geomCfg.seed || 4099);

  const strandCount = isMobile
    ? (geomCfg.strandCountMobile || 44)
    : (geomCfg.strandCountDesktop || 76);
  const segsPerStrand = isMobile ? 64 : 96;

  const totalLineVertices = strandCount * segsPerStrand * 2;
  const positions = new Float32Array(totalLineVertices * 3);
  const normals = new Float32Array(totalLineVertices * 3);
  const stringMeta = new Float32Array(totalLineVertices * 4); // [uProgress, phase, familyNorm, colorTone]

  let vOffset = 0;

  for (let s = 0; s < strandCount; s++) {
    let family = 0;
    if (s >= strandCount * 0.48 && s < strandCount * 0.78) family = 1;
    else if (s >= strandCount * 0.78) family = 2;

    const phase = rand() * Math.PI * 2.0;
    const radiusJitter = (0.92 + rand() * 0.18) * radiusScale;
    // Color tone: 0 = electric cyan, 0.5 = obsidian violet, 1.0 = vivid rose/magenta
    const colorTone = rand();

    const pts = [];
    for (let i = 0; i <= segsPerStrand; i++) {
      const u = i / segsPerStrand;
      pts.push(sampleHarmonicCurve(family, u, s, strandCount, phase, radiusJitter));
    }

    for (let i = 0; i < segsPerStrand; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const u0 = i / segsPerStrand;
      const u1 = (i + 1) / segsPerStrand;

      // Radial/binormal displacement direction for standing-wave vibration
      const n0 = new THREE.Vector3(p0.x, p0.y, p0.z * 0.5).normalize();
      const n1 = new THREE.Vector3(p1.x, p1.y, p1.z * 0.5).normalize();

      const i3 = vOffset * 3;
      const i4 = vOffset * 4;

      positions[i3] = p0.x;
      positions[i3 + 1] = p0.y;
      positions[i3 + 2] = p0.z;
      normals[i3] = n0.x;
      normals[i3 + 1] = n0.y;
      normals[i3 + 2] = n0.z;
      stringMeta[i4] = u0;
      stringMeta[i4 + 1] = phase;
      stringMeta[i4 + 2] = family / 2.0;
      stringMeta[i4 + 3] = colorTone;

      positions[i3 + 3] = p1.x;
      positions[i3 + 4] = p1.y;
      positions[i3 + 5] = p1.z;
      normals[i3 + 3] = n1.x;
      normals[i3 + 4] = n1.y;
      normals[i3 + 5] = n1.z;
      stringMeta[i4 + 4] = u1;
      stringMeta[i4 + 5] = phase;
      stringMeta[i4 + 6] = family / 2.0;
      stringMeta[i4 + 7] = colorTone;

      vOffset += 2;
    }
  }

  const stringsGeometry = new THREE.BufferGeometry();
  stringsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  stringsGeometry.setAttribute('aNormal', new THREE.BufferAttribute(normals, 3));
  stringsGeometry.setAttribute('aStringMeta', new THREE.BufferAttribute(stringMeta, 4));

  /* ---------- 2. 3D Cymatic Attractor Particles ---------- */
  const particleCount = isMobile
    ? (geomCfg.particleCountMobile || 3400)
    : (geomCfg.particleCountDesktop || 6800);

  const pPositions = new Float32Array(particleCount * 3);
  const pOrbit = new Float32Array(particleCount * 4); // [baseAngle, baseRadius, orbitSpeed, knotHarmonic]
  const pMeta = new Float32Array(particleCount * 4);  // [phase, sizeFactor, colorBias, radialSpan]

  for (let i = 0; i < particleCount; i++) {
    const angle = rand() * Math.PI * 2.0;
    const tierRand = rand();

    let baseRadius;
    let radialSpan;
    let orbitSpeed;
    let knotHarmonic;
    let sizeFactor;

    if (tierRand < 0.46) {
      // Inner cymatic nodal ring (dense fine stippled harmonic nodes)
      baseRadius = (1.18 + Math.pow(rand(), 1.5) * 0.45) * radiusScale;
      radialSpan = (0.18 + rand() * 0.36) * radiusScale;
      orbitSpeed = (0.16 + rand() * 0.18) * (rand() < 0.8 ? 1.0 : -0.7);
      knotHarmonic = 3.0;
      sizeFactor = 0.55 + rand() * 0.65;
    } else if (tierRand < 0.84) {
      // Mid-range 3D toroidal attractor stream
      baseRadius = (1.42 + rand() * 0.68) * radiusScale;
      radialSpan = (0.38 + rand() * 0.72) * radiusScale;
      orbitSpeed = (0.12 + rand() * 0.16) * (rand() < 0.7 ? 1.0 : -0.6);
      knotHarmonic = 2.0;
      sizeFactor = 0.65 + rand() * 0.85;
    } else {
      // Outer escaping resonant harmonic packets
      baseRadius = (1.75 + rand() * 0.85) * radiusScale;
      radialSpan = (0.65 + rand() * 1.15) * radiusScale;
      orbitSpeed = (0.07 + rand() * 0.11);
      knotHarmonic = 4.0;
      sizeFactor = 0.45 + rand() * 0.90;
    }

    const zSpread = (rand() - 0.5) * 0.72 * radiusScale;
    const x = Math.cos(angle) * baseRadius;
    const y = Math.sin(angle) * baseRadius;

    // Color bias: blend across Electric Cyan (0.0), Obsidian Violet (0.5), Vivid Rose/Magenta (1.0)
    const colorBias = rand();
    const phase = rand();

    const i3 = i * 3;
    const i4 = i * 4;
    pPositions[i3] = x;
    pPositions[i3 + 1] = y;
    pPositions[i3 + 2] = zSpread;

    pOrbit[i4] = angle;
    pOrbit[i4 + 1] = baseRadius;
    pOrbit[i4 + 2] = orbitSpeed;
    pOrbit[i4 + 3] = knotHarmonic;

    pMeta[i4] = phase;
    pMeta[i4 + 1] = sizeFactor;
    pMeta[i4 + 2] = colorBias;
    pMeta[i4 + 3] = radialSpan;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  particlesGeometry.setAttribute('aOrbit', new THREE.BufferAttribute(pOrbit, 4));
  particlesGeometry.setAttribute('aMeta', new THREE.BufferAttribute(pMeta, 4));

  /* ---------- 3. Obsidian Singularity Core & Caustic Halo Plane ---------- */
  const coreRadius = (geomCfg.coreRadius || 1.12) * radiusScale;
  const coreGeometry = new THREE.CircleGeometry(coreRadius * 1.24, 96);

  const haloRadius = (geomCfg.haloRadius || 3.85) * radiusScale;
  const haloGeometry = new THREE.PlaneGeometry(haloRadius * 2.2, haloRadius * 2.2, 1, 1);

  return {
    stringsGeometry,
    particlesGeometry,
    coreGeometry,
    haloGeometry,
    coreRadius,
    haloRadius,
  };
}

/**
 * Creates custom GLSL materials for the Harmonic Nexus sculpture.
 */
function createHarmonicNexusMaterials(settings, { coreRadius, haloRadius }) {
  const palette = settings.palette || {};
  const cyanColor = new THREE.Color(palette.electricCyan || '#00f0ff');
  const violetColor = new THREE.Color(palette.obsidianViolet || '#a855f7');
  const magentaColor = new THREE.Color(palette.vividPink || '#f43f5e');
  const coreWhite = new THREE.Color(palette.highlightWhite || '#f0fdfa');
  const voidColor = new THREE.Color(palette.voidColor || '#040609');

  /* ---------- 1. Obsidian Singularity Core Material ---------- */
  const coreMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: true,
    depthWrite: false,
    uniforms: {
      uVoidColor: { value: voidColor },
      uCyanColor: { value: cyanColor },
      uVioletColor: { value: violetColor },
      uMagentaColor: { value: magentaColor },
      uTime: { value: 0 },
      uSectionCalm: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv * 2.0 - 1.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uVoidColor;
      uniform vec3 uCyanColor;
      uniform vec3 uVioletColor;
      uniform vec3 uMagentaColor;
      uniform float uTime;
      uniform float uSectionCalm;

      varying vec2 vUv;

      void main() {
        float r = length(vUv);
        if (r > 1.0) discard;

        // Solid obsidian void up to r=0.81, then a razor-thin iridescent Fresnel rim
        float bodyAlpha = 1.0 - smoothstep(0.79, 0.98, r);
        float angle = atan(vUv.y, vUv.x);

        // Subtle acoustic rim resonance around the event horizon
        float rimBand = exp(-pow((r - 0.815) / 0.022, 2.0));
        float wave = 0.5 + 0.5 * sin(angle * 3.0 - uTime * 1.1);
        float cyanBias = pow(0.5 + 0.5 * cos(angle - 2.2), 2.0);
        float pinkBias = pow(0.5 + 0.5 * cos(angle + 0.65), 2.0);

        vec3 rimCol = mix(uVioletColor, uCyanColor, cyanBias);
        rimCol = mix(rimCol, uMagentaColor, pinkBias * 0.75);

        float calmScale = 1.0 - uSectionCalm * 0.65;
        vec3 col = uVoidColor + rimCol * rimBand * (0.28 + 0.25 * wave) * calmScale;
        float alpha = clamp(bodyAlpha + rimBand * 0.45, 0.0, 1.0);

        gl_FragColor = vec4(col, alpha);
      }
    `,
  });

  /* ---------- 2. Volumetric Caustic Halo Material ---------- */
  const haloMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uCyanColor: { value: cyanColor },
      uVioletColor: { value: violetColor },
      uMagentaColor: { value: magentaColor },
      uCoreRadius: { value: coreRadius },
      uHaloRadius: { value: haloRadius },
      uSectionCalm: { value: 0 },
      uImpulse: { value: 0 },
    },
    vertexShader: `
      varying vec2 vLocalPos;
      void main() {
        vLocalPos = position.xy;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uCyanColor;
      uniform vec3 uVioletColor;
      uniform vec3 uMagentaColor;
      uniform float uCoreRadius;
      uniform float uHaloRadius;
      uniform float uSectionCalm;
      uniform float uImpulse;

      varying vec2 vLocalPos;

      void main() {
        float r = length(vLocalPos);
        float angle = atan(vLocalPos.y, vLocalPos.x);

        // Keep inner obsidian core completely clean and dark
        float innerCut = smoothstep(uCoreRadius * 0.88, uCoreRadius * 1.08, r);
        float normR = max(0.0, (r - uCoreRadius) / max(0.001, uHaloRadius - uCoreRadius));

        // Multi-scale radial caustic falloff
        float tightAura = exp(-pow((r - uCoreRadius * 1.15) / (uCoreRadius * 0.42), 2.0));
        float midBloom = exp(-normR * 2.8) * (1.0 - smoothstep(0.65, 1.0, normR));
        float outerMist = exp(-normR * 1.55) * (1.0 - smoothstep(0.82, 1.0, normR));

        // 3-pillar angular light lobes (Cyan upper-left, Violet top-right/core, Magenta lower-right)
        float cyanLobe = pow(0.5 + 0.5 * cos(angle - 2.35 + 0.15 * sin(uTime * 0.4)), 2.2)
                       + 0.65 * pow(0.5 + 0.5 * cos(angle + 0.85), 2.8);
        float violetLobe = pow(0.5 + 0.5 * cos(angle - 0.75 - 0.18 * cos(uTime * 0.35)), 2.0)
                         + 0.55 * pow(0.5 + 0.5 * cos(angle + 2.45), 2.4);
        float magentaLobe = pow(0.5 + 0.5 * cos(angle + 0.35 + 0.12 * sin(uTime * 0.45)), 2.2)
                          + 0.6 * pow(0.5 + 0.5 * cos(angle + 1.35), 2.6);

        // Travelling harmonic wave around the halo
        float rotPulse = pow(0.5 + 0.5 * cos(angle * 2.0 - uTime * 0.78), 3.0);
        float breathe = 0.90 + 0.10 * sin(uTime * 1.15 + angle * 2.0) + uImpulse * 0.25;

        vec3 cyanContrib = uCyanColor * cyanLobe * (tightAura * 0.22 + midBloom * 0.16 + outerMist * 0.05);
        vec3 violetContrib = uVioletColor * violetLobe * (tightAura * 0.20 + midBloom * 0.15 + outerMist * 0.05);
        vec3 magentaContrib = uMagentaColor * magentaLobe * (tightAura * 0.21 + midBloom * 0.15 + outerMist * 0.04);

        vec3 col = (cyanContrib + violetContrib + magentaContrib) * (1.0 + 0.28 * rotPulse) * breathe * innerCut;
        col *= (1.0 - uSectionCalm * 0.72);

        float alpha = clamp(length(col) * 1.5, 0.0, 0.85);
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });

  /* ---------- 3. Resonant 3D Harmonic Strings Material ---------- */
  const stringsMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uCyanColor: { value: cyanColor },
      uVioletColor: { value: violetColor },
      uMagentaColor: { value: magentaColor },
      uCoreWhite: { value: coreWhite },
      uPointer: { value: new THREE.Vector2(99, 99) },
      uHover: { value: 0 },
      uImpulse: { value: 0 },
      uSectionCalm: { value: 0 },
      uCoreRadius: { value: coreRadius },
    },
    vertexShader: `
      attribute vec3 aNormal;
      attribute vec4 aStringMeta; // [uProgress, phase, familyNorm, colorTone]

      uniform float uTime;
      uniform vec2 uPointer;
      uniform float uHover;
      uniform float uImpulse;
      uniform float uCoreRadius;

      varying float vProgress;
      varying float vPhase;
      varying float vFamily;
      varying float vColorTone;
      varying float vPluck;
      varying float vAngle;
      varying float vRadius;
      varying float vDepth;

      void main() {
        float u = aStringMeta.x;
        float phase = aStringMeta.y;
        float family = aStringMeta.z;
        float colorTone = aStringMeta.w;

        vProgress = u;
        vPhase = phase;
        vFamily = family;
        vColorTone = colorTone;

        // Slow majestic 3D precession of the harmonic weave
        float rot = uTime * 0.085;
        float cR = cos(rot);
        float sR = sin(rot);
        vec3 pos = vec3(
          position.x * cR - position.y * sR,
          position.x * sR + position.y * cR,
          position.z
        );
        vec3 norm = vec3(
          aNormal.x * cR - aNormal.y * sR,
          aNormal.x * sR + aNormal.y * cR,
          aNormal.z
        );

        // Guitar string standing-wave harmonics (fundamental + 3rd & 5th overtones)
        float envelope = sin(u * 3.14159265);
        float fundamental = sin(u * 9.42477 - uTime * 1.95 + phase) * 0.048;
        float overtone3 = sin(u * 25.1327 + uTime * 3.10 - phase * 1.7) * 0.022;
        float impulseWave = sin(u * 37.699 - uTime * 8.5 + phase) * uImpulse * 0.065;

        // Global cymatic breathing
        float angle = atan(pos.y, pos.x);
        float breathe = sin(uTime * 1.15 + angle * 2.0 + phase * 0.4) * 0.055;

        pos += norm * ((fundamental + overtone3 + impulseWave) * envelope + breathe);

        // Interactive pointer "pluck" & magnetic string deflection
        vec2 toPtr = pos.xy - uPointer;
        float ptrDist = length(toPtr);
        float pluckField = uHover * exp(-ptrDist * ptrDist * 1.35);
        vec2 pushDir = ptrDist > 0.001 ? normalize(toPtr) : norm.xy;

        // High-frequency acoustic string shimmer when plucked by the pointer
        float pluckVib = sin(u * 43.98 - uTime * 12.0 + phase) * 0.045 * pluckField;
        pos.xy += pushDir * (pluckField * 0.24 + pluckVib);
        pos.z += pluckField * 0.18 * sin(u * 6.28318 + phase);

        // Ensure no string vertex dips inside the dark obsidian core silhouette
        float rXY = length(pos.xy);
        float minR = uCoreRadius * 0.99;
        if (rXY < minR && rXY > 0.001) {
          pos.xy = (pos.xy / rXY) * minR;
        }

        vPluck = clamp(pluckField + uImpulse * 0.6, 0.0, 1.0);
        vAngle = atan(pos.y, pos.x);
        vRadius = length(pos.xy);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vDepth = mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uCyanColor;
      uniform vec3 uVioletColor;
      uniform vec3 uMagentaColor;
      uniform vec3 uCoreWhite;
      uniform float uSectionCalm;

      varying float vProgress;
      varying float vPhase;
      varying float vFamily;
      varying float vColorTone;
      varying float vPluck;
      varying float vAngle;
      varying float vRadius;
      varying float vDepth;

      void main() {
        // Travelling harmonic energy pulses along each string
        float wave1 = fract(vProgress - uTime * 0.24 + vPhase * 0.15915);
        float pulse1 = exp(-pow((wave1 - 0.5) / 0.11, 2.0));

        float wave2 = fract(vProgress + uTime * 0.17 - vPhase * 0.15915);
        float pulse2 = exp(-pow((wave2 - 0.5) / 0.14, 2.0));

        // Circumferential cymatic wave travelling around the entire sculpture
        float ringWave = pow(0.5 + 0.5 * cos(vAngle - uTime * 0.82), 4.0)
                       + 0.7 * pow(0.5 + 0.5 * cos(vAngle + uTime * 0.58 - 2.1), 5.0);

        // Angular color choreography: Cyan upper-left/lower-right, Violet core, Magenta right/lower
        float cyanSector = pow(0.5 + 0.5 * cos(vAngle - 2.3), 1.8)
                         + 0.6 * pow(0.5 + 0.5 * cos(vAngle + 0.8), 2.2);
        float magentaSector = pow(0.5 + 0.5 * cos(vAngle + 0.25), 1.8)
                            + 0.6 * pow(0.5 + 0.5 * cos(vAngle + 1.4), 2.2);

        vec3 baseCol = mix(uCyanColor, uVioletColor, smoothstep(0.2, 0.65, vColorTone));
        baseCol = mix(baseCol, uMagentaColor, smoothstep(0.6, 0.95, vColorTone) * 0.85);

        // Blend sector lighting so color distribution feels cohesive and sculptural
        baseCol = mix(baseCol, uCyanColor, clamp(cyanSector * 0.45, 0.0, 0.65));
        baseCol = mix(baseCol, uMagentaColor, clamp(magentaSector * 0.42, 0.0, 0.65));

        float energy = clamp(pulse1 * 0.85 + pulse2 * 0.55 + ringWave * 0.45 + vPluck * 0.95, 0.0, 1.5);
        float whiteHot = pow(clamp(energy - 0.55, 0.0, 1.0), 2.2) * 0.78;
        vec3 col = mix(baseCol, uCoreWhite, whiteHot);

        // Soft fade at string endpoints so chords dissolve organically into space
        float endFade = smoothstep(0.0, 0.08, vProgress) * (1.0 - smoothstep(0.92, 1.0, vProgress));

        // Keep resting strings delicate so bright travelling harmonic pulses pop
        float baseAlpha = 0.075 + 0.36 * pulse1 + 0.22 * pulse2 + 0.18 * ringWave + 0.42 * vPluck;
        float calmFactor = 1.0 - uSectionCalm * 0.70;
        float alpha = clamp(baseAlpha * endFade * calmFactor, 0.0, 0.92);

        gl_FragColor = vec4(col * alpha * 1.35, alpha);
      }
    `,
  });

  /* ---------- 4. Cymatic Attractor Particle Material ---------- */
  const particlesMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: 1.5 },
      uCyanColor: { value: cyanColor },
      uVioletColor: { value: violetColor },
      uMagentaColor: { value: magentaColor },
      uCoreWhite: { value: coreWhite },
      uPointer: { value: new THREE.Vector2(99, 99) },
      uHover: { value: 0 },
      uImpulse: { value: 0 },
      uSectionCalm: { value: 0 },
      uCoreRadius: { value: coreRadius },
    },
    vertexShader: `
      attribute vec4 aOrbit; // [baseAngle, baseRadius, orbitSpeed, knotHarmonic]
      attribute vec4 aMeta;  // [phase, sizeFactor, colorBias, radialSpan]

      uniform float uTime;
      uniform float uPixelRatio;
      uniform vec2 uPointer;
      uniform float uHover;
      uniform float uImpulse;
      uniform float uCoreRadius;

      varying float vColorBias;
      varying float vAlpha;
      varying float vHighlight;
      varying float vAngle;

      void main() {
        float baseAngle = aOrbit.x;
        float baseRadius = aOrbit.y;
        float orbitSpeed = aOrbit.z;
        float harmonic = aOrbit.w;

        float phase = aMeta.x;
        float sizeFactor = aMeta.y;
        float colorBias = aMeta.z;
        float radialSpan = aMeta.w;

        vColorBias = colorBias;

        // Continuous orbital motion + outward harmonic data flow cycle
        float flowCycle = fract(phase + uTime * (0.19 + 0.08 * sizeFactor));
        float flowFade = smoothstep(0.0, 0.15, flowCycle) * (1.0 - smoothstep(0.68, 1.0, flowCycle));

        float angle = baseAngle + uTime * orbitSpeed + flowCycle * 0.38 * sign(orbitSpeed);
        float cymaticWave = sin(angle * harmonic - uTime * 1.35 + phase * 6.28318) * 0.14;
        float breathe = sin(uTime * 1.15 + angle * 2.0) * 0.075;

        float r = baseRadius + flowCycle * radialSpan + cymaticWave + breathe;
        r = max(uCoreRadius * 1.015, r);

        float z = position.z * (0.85 + 0.3 * sin(angle * 2.0 + uTime * 0.7))
                + 0.18 * cos(angle * harmonic + uTime * 0.9);

        vec3 pos = vec3(cos(angle) * r, sin(angle) * r, z);

        // Travelling cymatic activation pulses around the attractor
        float pulseA = pow(0.5 + 0.5 * cos(angle - uTime * 0.86), 5.0);
        float pulseB = pow(0.5 + 0.5 * cos(angle + uTime * 0.62 - 1.9), 6.0);
        float pulseActivation = clamp(pulseA + pulseB * 0.85, 0.0, 1.35);

        // Interactive pointer vortex swirl & local resonance
        vec2 toPtr = pos.xy - uPointer;
        float ptrDist = length(toPtr);
        float ptrEffect = uHover * exp(-ptrDist * ptrDist * 1.25);
        if (ptrDist > 0.001) {
          vec2 radialDir = toPtr / ptrDist;
          vec2 tangentDir = vec2(-radialDir.y, radialDir.x);
          pos.xy += (radialDir * 0.16 + tangentDir * 0.22) * ptrEffect;
        }

        vAngle = atan(pos.y, pos.x);
        vHighlight = clamp(pulseActivation * 0.78 + ptrEffect * 0.95 + uImpulse * 0.65, 0.0, 1.0);
        vAlpha = clamp((0.20 + 0.68 * pulseActivation + 0.45 * ptrEffect) * flowFade, 0.0, 1.0);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        float perspectiveScale = 27.0 / max(2.5, -mvPosition.z);
        float pulseBoost = 1.0 + 0.55 * pulseActivation + 0.50 * ptrEffect + 0.35 * uImpulse;
        gl_PointSize = clamp(sizeFactor * perspectiveScale * uPixelRatio * pulseBoost, 1.6, 12.5);
      }
    `,
    fragmentShader: `
      uniform vec3 uCyanColor;
      uniform vec3 uVioletColor;
      uniform vec3 uMagentaColor;
      uniform vec3 uCoreWhite;
      uniform float uSectionCalm;

      varying float vColorBias;
      varying float vAlpha;
      varying float vHighlight;
      varying float vAngle;

      void main() {
        vec2 uv = gl_PointCoord * 2.0 - 1.0;
        float r2 = dot(uv, uv);
        if (r2 > 1.0) discard;

        float dist = sqrt(r2);
        // Crisp luminous dot core with saturated harmonic halo
        float core = exp(-r2 * 10.5);
        float halo = exp(-r2 * 3.0) * (1.0 - smoothstep(0.68, 1.0, dist));

        float cyanArc = pow(0.5 + 0.5 * cos(vAngle - 2.3), 1.8);
        float magentaArc = pow(0.5 + 0.5 * cos(vAngle + 0.35), 1.8);

        vec3 tint = mix(uCyanColor, uVioletColor, smoothstep(0.18, 0.62, vColorBias));
        tint = mix(tint, uMagentaColor, smoothstep(0.58, 0.92, vColorBias));
        tint = mix(tint, uCyanColor, cyanArc * 0.40);
        tint = mix(tint, uMagentaColor, magentaArc * 0.38);

        float whiteMix = core * pow(vHighlight, 1.45) * 0.84;
        vec3 col = mix(tint, uCoreWhite, whiteMix);

        float shape = core * 0.96 + halo * (0.28 + 0.32 * vHighlight);
        float calmFactor = 1.0 - uSectionCalm * 0.68;
        float finalAlpha = clamp(shape * vAlpha * calmFactor, 0.0, 0.96);

        gl_FragColor = vec4(col * finalAlpha * 1.42, finalAlpha);
      }
    `,
  });

  return {
    coreMaterial,
    haloMaterial,
    stringsMaterial,
    particlesMaterial,
  };
}

/**
 * Mounts the Harmonic Nexus 3D interactive scene into `container`.
 */
export function mountHarmonicNexusScene(
  container,
  settings,
  { reducedMotion, coarsePointer, onReady, onError }
) {
  const { cameraFraming, parallaxStrength, rendering } = settings;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    premultipliedAlpha: true,
    powerPreference: coarsePointer ? 'default' : 'high-performance',
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.22;

  const maxDpr = coarsePointer ? rendering.maxPixelRatioMobile : rendering.maxPixelRatioDesktop;
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  renderer.setPixelRatio(dpr);

  const canvas = renderer.domElement;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(cameraFraming.fovDesktop || 38, 1, 0.5, 120);

  const geoms = createHarmonicNexusGeometries({
    isMobile: coarsePointer,
    settings,
  });
  const mats = createHarmonicNexusMaterials(settings, {
    coreRadius: geoms.coreRadius,
    haloRadius: geoms.haloRadius,
  });
  mats.particlesMaterial.uniforms.uPixelRatio.value = dpr;

  const haloMesh = new THREE.Mesh(geoms.haloGeometry, mats.haloMaterial);
  haloMesh.position.z = -0.25;
  haloMesh.renderOrder = 0;

  const coreMesh = new THREE.Mesh(geoms.coreGeometry, mats.coreMaterial);
  coreMesh.position.z = 0.0;
  coreMesh.renderOrder = 1;

  const stringsLines = new THREE.LineSegments(geoms.stringsGeometry, mats.stringsMaterial);
  stringsLines.renderOrder = 2;

  const particlePoints = new THREE.Points(geoms.particlesGeometry, mats.particlesMaterial);
  particlePoints.renderOrder = 3;

  const nexusGroup = new THREE.Group();
  nexusGroup.add(haloMesh);
  nexusGroup.add(coreMesh);
  nexusGroup.add(stringsLines);
  nexusGroup.add(particlePoints);
  scene.add(nexusGroup);

  const controller = new SculptureController({
    cameraFraming,
    parallaxStrength,
    reducedMotion,
  });

  const fitCamera = (w, h) => {
    const isDesktop = w >= 1024;
    camera.aspect = w / h;
    camera.fov = isDesktop ? (cameraFraming.fovDesktop || 38) : (cameraFraming.fovMobile || 44);

    const center = isDesktop
      ? (cameraFraming.nexusCenterDesktop || [2.48, 0.08, 0])
      : (cameraFraming.nexusCenterMobile || [0.0, -0.58, 0]);
    nexusGroup.position.set(center[0], center[1], center[2]);
    const scale = isDesktop ? 1.0 : 0.88;
    nexusGroup.scale.set(scale, scale, scale);

    controller.setViewportMode(isDesktop);
    controller.update(0, performance.now());
    controller.applyToCamera(camera);
    camera.updateProjectionMatrix();
  };

  let width = 0;
  let height = 0;
  const resize = () => {
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    if (w === width && h === height) return;
    width = w;
    height = h;
    renderer.setSize(w, h, false);
    fitCamera(w, h);
    requestFrame();
  };

  let rafId = 0;
  let running = false;
  let onScreen = true;
  let lastTime = performance.now();
  let lastRender = 0;
  let disposed = false;
  let readySent = false;
  let impulseStrength = 0.0;
  const minFrameMs = coarsePointer ? 1000 / (rendering.mobileFps || 30) : 0;

  const renderFrame = (now, dt) => {
    controller.applyToCamera(camera);
    const timeSeconds = reducedMotion ? 0.0 : now * 0.001;

    // Decay harmonic pluck impulse smoothly
    impulseStrength *= Math.exp(-dt * 2.6);
    if (impulseStrength < 0.002) impulseStrength = 0.0;

    const rootEl = container.closest('[data-theme]') || container.parentElement || container;
    const calmVal = parseFloat(getComputedStyle(rootEl).getPropertyValue('--section-calm') || '0');

    // Keep core & halo facing the camera while strings and particles rotate in 3D
    coreMesh.quaternion.copy(camera.quaternion);
    haloMesh.quaternion.copy(camera.quaternion);

    const camZ = camera.position.z || 10.0;
    const halfH = camZ * Math.tan((camera.fov * Math.PI) / 360.0);
    const halfW = halfH * camera.aspect;
    const ptrWorldX = controller.currentPointer.x * halfW;
    const ptrWorldY = controller.currentPointer.y * halfH;
    const localPtrX = ptrWorldX - nexusGroup.position.x;
    const localPtrY = ptrWorldY - nexusGroup.position.y;
    const hoverVal = pointerInside ? 1.0 : 0.0;

    mats.coreMaterial.uniforms.uTime.value = timeSeconds;
    mats.coreMaterial.uniforms.uSectionCalm.value = calmVal;

    mats.haloMaterial.uniforms.uTime.value = timeSeconds;
    mats.haloMaterial.uniforms.uSectionCalm.value = calmVal;
    mats.haloMaterial.uniforms.uImpulse.value = impulseStrength;

    mats.stringsMaterial.uniforms.uTime.value = timeSeconds;
    mats.stringsMaterial.uniforms.uSectionCalm.value = calmVal;
    mats.stringsMaterial.uniforms.uPointer.value.set(localPtrX, localPtrY);
    mats.stringsMaterial.uniforms.uHover.value = hoverVal;
    mats.stringsMaterial.uniforms.uImpulse.value = impulseStrength;

    mats.particlesMaterial.uniforms.uTime.value = timeSeconds;
    mats.particlesMaterial.uniforms.uSectionCalm.value = calmVal;
    mats.particlesMaterial.uniforms.uPointer.value.set(localPtrX, localPtrY);
    mats.particlesMaterial.uniforms.uHover.value = hoverVal;
    mats.particlesMaterial.uniforms.uImpulse.value = impulseStrength;

    renderer.render(scene, camera);

    if (!readySent) {
      readySent = true;
      onReady?.();
    }
  };

  const frame = (now) => {
    rafId = 0;
    if (!running || disposed) return;
    if (minFrameMs && now - lastRender < minFrameMs - 1) {
      rafId = requestAnimationFrame(frame);
      return;
    }
    const dt = Math.min((now - lastTime) / 1000, 1 / 20);
    lastTime = now;
    lastRender = now;
    const active = controller.update(dt, now);
    renderFrame(now, dt);
    if (active) rafId = requestAnimationFrame(frame);
    else running = false;
  };

  function requestFrame() {
    if (disposed || !onScreen || document.hidden) return;
    if (!running) {
      running = true;
      lastTime = performance.now();
    }
    if (!rafId) rafId = requestAnimationFrame(frame);
  }

  const stop = () => {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) requestFrame();
      else stop();
    },
    { rootMargin: '80px' }
  );
  io.observe(container);

  const onVisibility = () => (document.hidden ? stop() : requestFrame());
  document.addEventListener('visibilitychange', onVisibility);

  const ro = new ResizeObserver(resize);
  ro.observe(container);

  let activePointer = null;
  let pointerInside = false;
  let lastX = 0;
  let lastY = 0;

  const isInteractiveOrContent = (target) => {
    if (!target || !(target instanceof Element)) return false;
    return Boolean(
      target.closest(
        'a, button, input, textarea, select, label, [role="button"], [role="link"], p, h1, h2, h3, h4, h5, h6, span, li, blockquote, code, pre, nav, footer, [data-interactive], img, svg, iframe'
      )
    );
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'touch') return;
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    if (activePointer !== null) return;
    if (isInteractiveOrContent(e.target)) return;

    activePointer = e.pointerId;
    lastX = e.clientX;
    lastY = e.clientY;
    // Trigger a resonant harmonic pluck impulse when interacting with the background
    if (!reducedMotion) {
      impulseStrength = Math.min(1.0, impulseStrength + 0.85);
    }

    controller.beginDrag(e.timeStamp || performance.now());
    document.body.style.cursor = 'grabbing';
    requestFrame();
  };

  const onPointerMove = (e) => {
    pointerInside = true;
    if (e.pointerId === activePointer) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      controller.dragBy(dx, dy, e.timeStamp || performance.now());
      requestFrame();
      return;
    }

    if (e.pointerType === 'mouse' && activePointer === null) {
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
      controller.setPointer(nx, ny);
      requestFrame();
    }
  };

  const onPointerEnd = (e) => {
    if (e.pointerId !== activePointer) return;
    activePointer = null;
    document.body.style.cursor = '';
    controller.endDrag(e.timeStamp || performance.now());
    requestFrame();
  };

  const onPointerLeave = () => {
    pointerInside = false;
    if (activePointer !== null) return;
    controller.clearPointer();
    requestFrame();
  };

  const onBlur = () => {
    pointerInside = false;
    if (activePointer !== null) {
      activePointer = null;
      document.body.style.cursor = '';
      controller.endDrag(performance.now());
      requestFrame();
    }
  };

  window.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerEnd);
  window.addEventListener('pointercancel', onPointerEnd);
  window.addEventListener('blur', onBlur);
  document.addEventListener('mouseleave', onPointerLeave);

  const onContextLost = (e) => {
    e.preventDefault();
    stop();
    onError?.(new Error('WebGL context lost'));
  };
  canvas.addEventListener('webglcontextlost', onContextLost);

  resize();
  requestFrame();

  return function dispose() {
    disposed = true;
    stop();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);

    window.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerEnd);
    window.removeEventListener('pointercancel', onPointerEnd);
    window.removeEventListener('blur', onBlur);
    document.removeEventListener('mouseleave', onPointerLeave);
    canvas.removeEventListener('webglcontextlost', onContextLost);

    if (activePointer !== null) {
      document.body.style.cursor = '';
    }

    geoms.stringsGeometry.dispose();
    geoms.particlesGeometry.dispose();
    geoms.coreGeometry.dispose();
    geoms.haloGeometry.dispose();
    mats.coreMaterial.dispose();
    mats.haloMaterial.dispose();
    mats.stringsMaterial.dispose();
    mats.particlesMaterial.dispose();

    renderer.dispose();
    renderer.forceContextLoss?.();
    canvas.remove();
  };
}
