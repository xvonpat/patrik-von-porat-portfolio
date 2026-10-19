import * as THREE from 'three';

/**
 * Chladni Plate — sand on a vibrating plate.
 *
 * Thousands of grains start scattered. Each "tone" is a plate mode; grains are thrown
 * hardest where the plate vibrates most and come to rest on the nodal lines, so a
 * geometric figure forms out of noise. Every few seconds the tone changes, the sand
 * jumps and a new figure forms: Observe → Structure → Create → Refine, driven by sound.
 *
 * The simulation runs on the CPU (plain arrays); three.js only draws the grains as
 * additive points. Pointer movement acts like a finger on the plate and stirs the sand;
 * a click on empty background plays the next tone.
 */

const PI = Math.PI;
const HALF_PI = PI * 0.5;

function createRng(seed = 1) {
  let s = seed >>> 0;
  return function rand() {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToVec3(hex) {
  const v = parseInt(hex.replace('#', ''), 16);
  return new THREE.Vector3(((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255);
}

/**
 * Square-plate mode f = cos(nπu)·cos(mπv) ± cos(mπu)·cos(nπv) on plate coordinates in
 * [-1, 1]. Writes [f, ∂f/∂x, ∂f/∂y] into `out`; f is scaled to [-1, 1].
 */
function sampleMode(mode, x, y, out) {
  const { n, m, sign } = mode;
  const u = (x + 1) * HALF_PI;
  const v = (y + 1) * HALF_PI;
  const cnu = Math.cos(n * u), cmv = Math.cos(m * v), cmu = Math.cos(m * u), cnv = Math.cos(n * v);
  const snu = Math.sin(n * u), smv = Math.sin(m * v), smu = Math.sin(m * u), snv = Math.sin(n * v);
  out[0] = (cnu * cmv + sign * cmu * cnv) * 0.5;
  out[1] = (-n * snu * cmv - sign * m * smu * cnv) * 0.25 * PI;
  out[2] = (-m * cnu * smv - sign * n * cmu * snv) * 0.25 * PI;
}

function isInteractiveOrContent(target) {
  if (!target || !(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      'a, button, input, textarea, select, label, [role="button"], [role="link"], p, h1, h2, h3, h4, h5, h6, span, li, blockquote, code, pre, nav, footer, [data-interactive], img, svg, iframe'
    )
  );
}

export function mountChladniScene(container, settings, { reducedMotion, coarsePointer, onReady, onError }) {
  const { plate, sand, palette, rendering } = settings;
  const modes = plate.modes.map(([n, m, sign]) => ({ n, m, sign }));

  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true,
    premultipliedAlpha: true,
    powerPreference: coarsePointer ? 'default' : 'high-performance',
  });
  renderer.setClearColor(0x000000, 0);
  const maxDpr = coarsePointer ? rendering.maxPixelRatioMobile : rendering.maxPixelRatioDesktop;
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  renderer.setPixelRatio(dpr);

  const canvas = renderer.domElement;
  canvas.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none';
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
  camera.position.z = 5;

  /* ---------- Sand grains ---------- */
  const count = coarsePointer ? sand.countMobile : sand.countDesktop;
  const rand = createRng(plate.seed);
  const px = new Float32Array(count);
  const py = new Float32Array(count);
  const positions = new Float32Array(count * 3);
  const energy = new Float32Array(count);
  const seeds = new Float32Array(count);

  const scatter = () => {
    for (let i = 0; i < count; i++) {
      const a = rand() * PI * 2;
      const r = Math.sqrt(rand());
      px[i] = Math.cos(a) * r;
      py[i] = Math.sin(a) * r;
      energy[i] = 1;
    }
  };
  scatter();
  for (let i = 0; i < count; i++) seeds[i] = rand();

  const geometry = new THREE.BufferGeometry();
  const positionAttr = new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage);
  const energyAttr = new THREE.BufferAttribute(energy, 1).setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', positionAttr);
  geometry.setAttribute('aEnergy', energyAttr);
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

  const sandMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uSize: { value: sand.grainSize * dpr },
      uCalm: { value: 0 },
      uBone: { value: hexToVec3(palette.bone) },
      uCyan: { value: hexToVec3(palette.cyan) },
      uViolet: { value: hexToVec3(palette.violet) },
      uMagenta: { value: hexToVec3(palette.magenta) },
    },
    vertexShader: `
      attribute float aEnergy;
      attribute float aSeed;
      uniform float uSize;
      varying float vEnergy;
      varying float vSeed;
      varying vec2 vPlate;
      void main() {
        vEnergy = aEnergy;
        vSeed = aSeed;
        vPlate = position.xy;
        // Moving grains are slightly larger and softer; resting grains are fine and crisp.
        gl_PointSize = uSize * (0.75 + 0.55 * aSeed) * (1.0 + 0.6 * aEnergy);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uCalm;
      uniform vec3 uBone;
      uniform vec3 uCyan;
      uniform vec3 uViolet;
      uniform vec3 uMagenta;
      varying float vEnergy;
      varying float vSeed;
      varying vec2 vPlate;
      void main() {
        vec2 c = gl_PointCoord * 2.0 - 1.0;
        float d2 = dot(c, c);
        if (d2 > 1.0) discard;
        float dotMask = exp(-d2 * 3.2);

        // Resting sand reads as warm bone light; airborne sand carries the accent colours,
        // cyan on the upper left and violet towards the lower right of the plate.
        float diag = clamp(0.5 + 0.5 * (vPlate.x - vPlate.y) * 0.7071, 0.0, 1.0);
        vec3 accent = mix(uCyan, uViolet, smoothstep(0.25, 0.8, diag));
        accent = mix(accent, uMagenta, step(0.93, vSeed) * 0.8);
        float settled = 1.0 - smoothstep(0.02, 0.35, vEnergy);
        vec3 col = mix(accent, mix(uBone, accent, 0.28), settled);

        float alpha = mix(0.16, 0.62, settled) * dotMask * (1.0 - uCalm * 0.7);
        gl_FragColor = vec4(col * alpha, alpha);
      }
    `,
  });

  const sandPoints = new THREE.Points(geometry, sandMaterial);

  /* ---------- Plate rim: a faint edge so the figure reads as a physical plate ---------- */
  const rimGeometry = new THREE.RingGeometry(1.035, 1.045, 160);
  const rimMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color().setRGB(...hexToVec3(palette.violet).toArray(), THREE.SRGBColorSpace),
    transparent: true,
    opacity: plate.rimOpacity,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);

  const plateGroup = new THREE.Group();
  plateGroup.add(rim);
  plateGroup.add(sandPoints);
  scene.add(plateGroup);

  /* ---------- Layout ---------- */
  const hero = document.querySelector('#main-content section');
  let width = 0, height = 0, radius = 1, centreX = 0, centreY = 0, compact = false;

  const layout = () => {
    const rect = container.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    compact = width < 1024;
    renderer.setSize(width, height, false);
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();

    const heroRect = hero?.getBoundingClientRect();
    const heroTop = (heroRect?.top ?? 130) + window.scrollY;
    const heroHeight = heroRect?.height ?? height * 0.65;
    radius = compact
      ? Math.min(width * 0.46, 300)
      : Math.min(width * plate.radiusDesktop, height * 0.4);
    centreX = width * (compact ? 0.62 : plate.centreXDesktop);
    centreY = Math.min(heroTop + heroHeight * (compact ? 0.42 : 0.47), height * 0.53);
    plateGroup.position.set(centreX - width / 2, height / 2 - centreY, 0);
    plateGroup.scale.set(radius, radius, 1);
  };

  /* ---------- Simulation ---------- */
  const sample = new Float64Array(3);
  let modeIndex = 0;
  let modeAge = 0;
  let kick = 0;
  const pointer = { x: 0, y: 0, active: 0, target: 0 };

  const nextMode = () => {
    modeIndex = (modeIndex + 1) % modes.length;
    modeAge = 0;
    kick = 1;
  };

  const step = (dt) => {
    const mode = modes[modeIndex];
    // The pull towards nodal lines grows after each tone change, so grains visibly travel
    // first and only then settle into crisp lines.
    const settle = Math.min(1, modeAge / sand.settleSeconds);
    const pull = sand.pullStart + (sand.pullEnd - sand.pullStart) * settle * settle;
    const throwScale = sand.throw * (1 + kick * sand.kickStrength);
    const reach2 = sand.pointerReach * sand.pointerReach;
    const scale = dt * 60;

    for (let i = 0; i < count; i++) {
      let x = px[i];
      let y = py[i];
      sampleMode(mode, x, y, sample);
      const f = sample[0];
      let amp = Math.abs(f);

      if (pointer.active > 0.01) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        amp += pointer.active * sand.pointerStrength * Math.exp(-(dx * dx + dy * dy) / reach2);
      }

      const a = rand() * PI * 2;
      const jump = (amp * throwScale + sand.jitter) * scale;
      x += Math.cos(a) * jump - f * sample[1] * pull * scale;
      y += Math.sin(a) * jump - f * sample[2] * pull * scale;

      // Grains bounce back off the plate edge.
      const r = Math.sqrt(x * x + y * y);
      if (r > 1) {
        const k = Math.max(0, 2 - r) / r;
        x *= k;
        y *= k;
      }
      px[i] = x;
      py[i] = y;
      energy[i] += (Math.min(1, amp * 3) - energy[i]) * 0.2;
    }
  };

  const writeBuffers = () => {
    for (let i = 0; i < count; i++) {
      positions[i * 3] = px[i];
      positions[i * 3 + 1] = py[i];
    }
    positionAttr.needsUpdate = true;
    energyAttr.needsUpdate = true;
  };

  /* ---------- Loop ---------- */
  let rafId = 0;
  let lastTime = 0;
  let disposed = false;
  let readySent = false;
  let inHero = true;
  const minFrameMs = 1000 / (compact || coarsePointer ? rendering.mobileFps : rendering.desktopFps) - 1;
  const rootEl = container.closest('[data-theme]') || container.parentElement || container;

  const render = () => {
    sandMaterial.uniforms.uCalm.value = parseFloat(getComputedStyle(rootEl).getPropertyValue('--section-calm') || '0');
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

    try {
      modeAge += dt;
      kick *= Math.exp(-dt * sand.kickDecay);
      pointer.active += (pointer.target - pointer.active) * (1 - Math.exp(-dt * 6));
      if (modeAge > plate.holdSeconds) nextMode();
      // Fixed sub-steps keep the sand's behaviour the same at 30 and 60 fps.
      const steps = Math.max(1, Math.min(3, Math.round(dt * 60)));
      for (let s = 0; s < steps; s++) step(dt / steps);
      writeBuffers();
      render();
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

  /* ---------- Events ---------- */
  const toPlate = (clientX, clientY) => {
    const rect = container.getBoundingClientRect();
    pointer.x = (clientX - rect.left - centreX) / radius;
    pointer.y = -(clientY - rect.top - centreY) / radius;
  };

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    toPlate(e.clientX, e.clientY);
    pointer.target = Math.hypot(pointer.x, pointer.y) < 1.3 ? 1 : 0;
  };
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || isInteractiveOrContent(e.target)) return;
    nextMode();
  };
  const clearPointer = () => { pointer.target = 0; };
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
    window.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('blur', clearPointer);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('mouseleave', clearPointer);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    geometry.dispose();
    sandMaterial.dispose();
    rimGeometry.dispose();
    rimMaterial.dispose();
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
      // One finished figure, drawn once: no motion at all.
      modeAge = sand.settleSeconds;
      for (let s = 0; s < 360; s++) step(1 / 60);
      writeBuffers();
      render();
    } else {
      if (!coarsePointer) {
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('blur', clearPointer);
        document.addEventListener('mouseleave', clearPointer);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      writeBuffers();
      onScroll();
    }
  } catch (error) {
    dispose();
    throw error;
  }

  return dispose;
}
