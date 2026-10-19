import * as THREE from 'three';

/**
 * Contour Flow — a dark survey landscape drawn as hundreds of hair-thin elevation lines.
 *
 * The terrain (a meandering river valley between rolling hills) is evaluated in the vertex
 * shader; contour lines are drawn per pixel from the interpolated height, so they stay
 * crisp and dense at any distance. Lines are deep teal, brighten to cyan along the river
 * and on lit ridges, and a sparse set turns rose. Motion is quiet: the lines drift slowly
 * downhill, a soft pulse travels along the valley and the hills breathe.
 */

const NOISE = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`;

const TERRAIN = `
  uniform float uTime;
  uniform float uBreath;
  uniform vec4 uRiver;    // amplitude 1, frequency 1, amplitude 2, frequency 2
  uniform vec2 uCourse;   // river x at z = 0, drift in x per unit of z
  uniform vec4 uValley;   // valley half-width, valley height, channel half-width, channel depth
  uniform vec3 uHills;    // amplitude, frequency, ridge sharpness

  float riverX(float z) {
    return uCourse.x + uCourse.y * z
      + uRiver.x * sin(z * uRiver.y + 0.6) + uRiver.z * sin(z * uRiver.w + 1.9);
  }

  // Rolling hills: fbm with soft ridges, quieter close to the river.
  float hills(vec2 p) {
    float h = 0.0;
    float amp = 1.0;
    float freq = uHills.y;
    for (int i = 0; i < 3; i++) {
      float n = snoise(p * freq + float(i) * 17.3);
      n = mix(n, 1.0 - abs(n) * 2.0, uHills.z);
      h += n * amp;
      amp *= 0.5;
      freq *= 2.02;
    }
    return h;
  }

  float heightAt(vec2 p) {
    float d = p.x - riverX(p.y);
    // A broad valley with a narrow, deeper channel cut into its floor: the channel's steep
    // banks pack contours tightly, which is what makes the river read as a bright ribbon.
    float valley = 1.0 - exp(-(d * d) / (uValley.x * uValley.x));
    float channel = 1.0 - exp(-(d * d) / (uValley.z * uValley.z));
    float away = smoothstep(uValley.z, uValley.x * 2.5, abs(d));
    float h = valley * uValley.y + channel * uValley.w;
    h += hills(p) * uHills.x * (0.2 + 0.8 * away) * uBreath;
    return h;
  }
`;

const VERTEX = `
  ${NOISE}
  ${TERRAIN}
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vHeight;
  varying float vRiver;

  void main() {
    vec2 p = position.xz;
    float h = heightAt(p);
    float e = 0.12;
    float hx = heightAt(p + vec2(e, 0.0)) - heightAt(p - vec2(e, 0.0));
    float hz = heightAt(p + vec2(0.0, e)) - heightAt(p - vec2(0.0, e));
    vNormal = normalize(vec3(-hx, 2.0 * e, -hz));
    vHeight = h;
    vRiver = p.x - riverX(p.y);
    vec4 world = modelMatrix * vec4(p.x, h, p.y, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const FRAGMENT = `
  ${NOISE}
  uniform float uTime;
  uniform float uSpacing;
  uniform float uLineWidth;
  uniform float uDrift;
  uniform float uCalm;
  uniform float uValleyWidth;
  uniform vec3 uTeal;
  uniform vec3 uCyan;
  uniform vec3 uRose;
  uniform vec3 uSurface;
  uniform vec3 uLight;
  uniform vec2 uFog;      // near, far (distance from camera)
  uniform vec3 uPulse;    // speed, length, strength

  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vHeight;
  varying float vRiver;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec3 n = normalize(vNormal);
    float lit = clamp(dot(n, normalize(uLight)), 0.0, 1.0);
    float slope = 1.0 - n.y;

    // Contour lines from the interpolated height; the slow drift makes them flow.
    float c = vHeight / uSpacing + uTime * uDrift;
    float fw = max(fwidth(c), 1e-4);
    float dist = abs(fract(c - 0.5) - 0.5) / fw;
    float line = 1.0 - smoothstep(0.0, uLineWidth, dist);
    // Colour: deep teal, brightening to cyan along the river and on lit, steep slopes.
    float river = exp(-(vRiver * vRiver) / (uValleyWidth * uValleyWidth));
    float pulsePos = fract(vWorld.z / uPulse.y + uTime * uPulse.x);
    float pulse = exp(-pow((pulsePos - 0.5) / 0.08, 2.0)) * uPulse.z;
    float glow = clamp(river * 0.95 + pow(lit, 3.0) * slope * 1.6 + pulse * (0.35 + river), 0.0, 1.0);

    // Where lines get denser than pixels they would shimmer; let them merge into a soft
    // tone — dim on the hills, but a luminous ribbon where the river packs them together.
    float density = smoothstep(0.55, 1.4, fw);
    line = mix(line, 0.1 + 0.55 * glow, density);
    vec3 col = mix(uTeal, uCyan, glow);

    // A sparse set of contours turns rose, in patches.
    float index = floor(c);
    float rosePatch = smoothstep(0.25, 0.65, snoise(vWorld.xz * 0.045 + 3.7));
    float pick = step(0.72, hash(vec2(index, 7.0)));
    float rose = rosePatch * pick * (1.0 - river);
    col = mix(col, uRose, rose);

    float fog = 1.0 - smoothstep(uFog.x, uFog.y, length(vWorld - cameraPosition));
    float strength = (0.16 + 0.95 * glow + 0.55 * rose) * line;

    vec3 surface = uSurface * (0.25 + 0.75 * lit);
    vec3 color = surface + col * strength;
    color *= fog * (1.0 - uCalm * 0.65);
    gl_FragColor = vec4(color, 1.0);  }
`;

function hexToVec3(hex) {
  const v = parseInt(hex.replace('#', ''), 16);
  return new THREE.Vector3(((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255);
}

export function mountContourScene(container, settings, { reducedMotion, coarsePointer, onReady, onError }) {
  const { terrain, lines, palette, camera: cam, motion, rendering } = settings;

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
  const camera = new THREE.PerspectiveCamera(cam.fovDesktop, 1, 0.5, 200);

  const segments = coarsePointer ? terrain.segmentsMobile : terrain.segmentsDesktop;
  const geometry = new THREE.PlaneGeometry(terrain.width, terrain.depth, segments, segments);
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(terrain.offset[0], 0, terrain.offset[1]);

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uBreath: { value: 1 },
      uRiver: { value: new THREE.Vector4(...terrain.river) },
      uCourse: { value: new THREE.Vector2(...terrain.course) },
      uValley: { value: new THREE.Vector4(...terrain.valley) },
      uHills: { value: new THREE.Vector3(...terrain.hills) },
      uSpacing: { value: lines.spacing },
      uLineWidth: { value: lines.width },
      uDrift: { value: reducedMotion ? 0 : motion.drift },
      uCalm: { value: 0 },
      uValleyWidth: { value: terrain.valley[2] * 1.6 },
      uTeal: { value: hexToVec3(palette.teal) },
      uCyan: { value: hexToVec3(palette.cyan) },
      uRose: { value: hexToVec3(palette.rose) },
      uSurface: { value: hexToVec3(palette.surface) },
      uLight: { value: new THREE.Vector3(...lines.light) },
      uFog: { value: new THREE.Vector2(...cam.fog) },
      uPulse: { value: new THREE.Vector3(motion.pulseSpeed, motion.pulseLength, reducedMotion ? 0 : motion.pulseStrength) },
    },
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  /* ---------- Camera & pointer parallax ---------- */
  const basePos = new THREE.Vector3();
  const baseTarget = new THREE.Vector3();
  const lookAt = new THREE.Vector3();
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
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
  };

  const placeCamera = () => {
    camera.position.set(
      basePos.x + pointer.x * cam.parallax[0],
      basePos.y + pointer.y * cam.parallax[1],
      basePos.z
    );
    lookAt.copy(baseTarget);
    camera.lookAt(lookAt);
  };

  /* ---------- Loop ---------- */
  const hero = document.querySelector('#main-content section');
  const rootEl = container.closest('[data-theme]') || container.parentElement || container;
  let rafId = 0, lastTime = 0, elapsed = 0, disposed = false, readySent = false, inHero = true;
  const minFrameMs = 1000 / (coarsePointer ? rendering.mobileFps : rendering.desktopFps) - 1;

  const render = () => {
    material.uniforms.uTime.value = elapsed;
    material.uniforms.uBreath.value = 1 + Math.sin(elapsed * motion.breathSpeed) * (reducedMotion ? 0 : motion.breathAmount);
    material.uniforms.uCalm.value = parseFloat(getComputedStyle(rootEl).getPropertyValue('--section-calm') || '0');
    placeCamera();
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
    pointer.x += (pointer.tx - pointer.x) * k;
    pointer.y += (pointer.ty - pointer.y) * k;
    try {
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

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    pointer.tx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
    pointer.ty = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
  };
  const clearPointer = () => { pointer.tx = 0; pointer.ty = 0; };
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
