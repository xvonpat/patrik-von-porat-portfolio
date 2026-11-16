import * as THREE from 'three';

/**
 * Obsidian Shard (prototype): one large piece of volcanic glass, lit like a product photograph.
 *
 * The shard is a convex solid cut by a handful of fracture planes and is ray traced per pixel
 * in the fragment shader, so every edge stays razor sharp at any size. Each face carries the
 * concentric ripples of a conchoidal fracture. The glass is black: what you see is the
 * reflection of a bone key light (which follows the mouse) plus violet and cyan lamps placed
 * behind the piece, which show up as glints through its thin edges. It turns very slowly.
 */

const PLANE_COUNT = 16;

const VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = position.xy;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = (aa) => `
  #define N ${PLANE_COUNT}
  #define AA ${aa}
  uniform vec4 uPlanes[N];     // outward normal, distance (object space)
  uniform vec3 uOrigins[N];    // strike point of each fracture face
  uniform mat3 uRot;           // object -> world
  uniform vec3 uCentre;
  uniform vec3 uCam;
  uniform vec2 uView;          // tan(fov/2) * aspect, tan(fov/2)
  uniform vec2 uPixel;         // one pixel in clip space
  uniform float uRadius;       // bounding sphere
  uniform vec3 uViolet;
  uniform vec3 uCyan;
  uniform vec3 uBone;
  uniform vec4 uLights;        // key, violet, cyan, exposure
  uniform vec3 uKeyDir;
  uniform vec2 uLamp;          // pointer offset applied to the lamps behind the shard
  uniform vec4 uGlass;         // ripple strength, ripple frequency, absorption, edge highlight
  uniform float uCalm;
  varying vec2 vUv;

  float softbox(vec3 d, vec3 c, float halfU, float halfV) {
    float f = dot(d, c);
    if (f <= 0.0) return 0.0;
    vec3 u = normalize(cross(c, vec3(0.0, 1.0, 0.0)));
    vec3 v = cross(u, c);
    float pu = dot(d, u) / f;
    float pv = dot(d, v) / f;
    return smoothstep(halfU, halfU * 0.55, abs(pu)) * smoothstep(halfV, halfV * 0.5, abs(pv));
  }

  // The studio around the shard, in world space. The camera sits on +z.
  vec3 environment(vec3 d) {
    vec3 left = normalize(vec3(-0.85, 0.3, 0.45));
    vec3 right = normalize(vec3(0.9, 0.15, 0.3));
    vec3 backViolet = normalize(vec3(-0.5 + uLamp.x, 0.2 + uLamp.y, -0.85));
    vec3 backCyan = normalize(vec3(0.55 + uLamp.x, -0.25 + uLamp.y, -0.8));
    // Dim, broad fills so every face has some tone.
    vec3 col = uViolet * uLights.y * 0.075 * pow(max(dot(d, left), 0.0), 2.5);
    col += uCyan * uLights.z * 0.065 * pow(max(dot(d, right), 0.0), 2.5);
    // Strip lights that draw the crisp reflections.
    col += uBone * uLights.x * softbox(d, uKeyDir, 0.85, 0.42);
    // A soft overhead wash and a second, dimmer panel so some face always carries a highlight.
    col += uBone * uLights.x * 0.05 * max(d.y, 0.0);
    col += uBone * uLights.x * 0.45 * softbox(d, normalize(vec3(0.45 - uKeyDir.x * 0.5, 0.35, 0.82)), 0.5, 0.3);
    col += uViolet * uLights.y * 0.7 * softbox(d, left, 0.12, 1.2);
    col += uCyan * uLights.z * 0.7 * softbox(d, right, 0.1, 1.1);
    // Lamps behind the piece: seen through the glass and along grazing edges.
    col += uViolet * uLights.y * pow(max(dot(d, backViolet), 0.0), 10.0) * 1.1;
    col += uCyan * uLights.z * pow(max(dot(d, backCyan), 0.0), 10.0) * 1.1;
    return col;
  }

  // Conchoidal fracture: concentric ripples spreading from the strike point of the face.
  vec3 fractureNormal(vec3 p, int idx) {
    vec3 n = uPlanes[idx].xyz;
    vec3 q = p - uOrigins[idx];
    q -= n * dot(q, n);
    float r = length(q) + 1e-4;
    float phase = float(idx) * 1.7;
    float ripple = sin(r * uGlass.y + phase) * exp(-r * 0.9);
    ripple += 0.35 * sin(r * uGlass.y * 0.37 - phase);
    return normalize(n + (q / r) * ripple * uGlass.x);
  }

  // Leaving the solid from a point inside or on its surface.
  float exitAt(vec3 p, vec3 d, out int idx) {
    float t = 1e9;
    idx = 0;
    for (int i = 0; i < N; i++) {
      float dn = dot(uPlanes[i].xyz, d);
      if (dn > 1e-5) {
        float tt = (uPlanes[i].w - dot(uPlanes[i].xyz, p)) / dn;
        if (tt < t) {
          t = tt;
          idx = i;
        }
      }
    }
    return t;
  }

  float schlick(float cosTheta) {
    return 0.08 + 0.92 * pow(1.0 - clamp(cosTheta, 0.0, 1.0), 5.0);
  }

  // Returns colour and coverage for one ray (world space).
  vec4 trace(vec3 roW, vec3 rdW) {
    vec3 oc = roW - uCentre;
    float b = dot(oc, rdW);
    if (b * b - dot(oc, oc) + uRadius * uRadius < 0.0) return vec4(0.0);

    // Work in object space (uRot is orthonormal, so its transpose is its inverse).
    vec3 ro = oc * uRot;
    vec3 rd = rdW * uRot;

    float tNear = -1e9;
    float tSecond = -1e9;
    float tFar = 1e9;
    int idx = 0;
    for (int i = 0; i < N; i++) {
      float dn = dot(uPlanes[i].xyz, rd);
      float dist = uPlanes[i].w - dot(uPlanes[i].xyz, ro);
      if (dn < -1e-5) {
        float t = dist / dn;
        if (t > tNear) {
          tSecond = tNear;
          tNear = t;
          idx = i;
        } else if (t > tSecond) {
          tSecond = t;
        }
      } else if (dn > 1e-5) {
        tFar = min(tFar, dist / dn);
      } else if (dist < 0.0) {
        return vec4(0.0);
      }
    }
    if (tNear >= tFar || tNear < 0.0) return vec4(0.0);

    vec3 p = ro + rd * tNear;
    vec3 n = fractureNormal(p, idx);
    float f0 = schlick(dot(n, -rd));
    vec3 col = environment(uRot * reflect(rd, n)) * f0;

    // Into the glass, out through the far face, plus one internal bounce.
    vec3 d1 = refract(rd, n, 1.0 / 1.5);
    int i1;
    float t1 = exitAt(p, d1, i1);
    vec3 p1 = p + d1 * t1;
    vec3 n1 = fractureNormal(p1, i1);
    vec3 out1 = refract(d1, -n1, 1.5);
    float f1 = dot(out1, out1) < 0.5 ? 1.0 : schlick(dot(d1, n1));
    vec3 absorb = uGlass.z * vec3(1.0, 1.18, 0.86);
    vec3 inner = environment(uRot * out1) * (1.0 - f1) * exp(-absorb * t1);

    vec3 d2 = reflect(d1, n1);
    int i2;
    float t2 = exitAt(p1, d2, i2);
    vec3 n2 = fractureNormal(p1 + d2 * t2, i2);
    vec3 out2 = refract(d2, -n2, 1.5);
    if (dot(out2, out2) > 0.5) {
      inner += environment(uRot * out2) * f1 * (1.0 - schlick(dot(d2, n2))) * exp(-absorb * (t1 + t2));
    }
    col += inner * (1.0 - f0);

    // Where two fracture faces meet, the chipped edge catches the key light.
    float edge = exp(-(tNear - tSecond) * 70.0);
    float keyFacing = 0.25 + 0.75 * max(dot(uRot * n, uKeyDir), 0.0);
    col += uBone * uGlass.w * edge * keyFacing;

    return vec4(col, 1.0);
  }

  void main() {
    vec4 sum = vec4(0.0);
    for (int y = 0; y < AA; y++) {
      for (int x = 0; x < AA; x++) {
        vec2 o = (vec2(float(x), float(y)) + 0.5) / float(AA) - 0.5;
        vec2 uv = vUv + o * uPixel;
        vec3 rd = normalize(vec3(uv.x * uView.x, uv.y * uView.y, -1.0));
        vec4 s = trace(uCam, rd);
        s.rgb = 1.0 - exp(-s.rgb * uLights.w);
        sum += vec4(s.rgb * s.a, s.a);
      }
    }
    sum /= float(AA * AA);
    sum.rgb *= 1.0 - uCalm * 0.65;
    gl_FragColor = sum;   // premultiplied
  }
`;

function hexToVec3(hex) {
  const v = parseInt(hex.replace('#', ''), 16);
  return new THREE.Vector3(((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255);
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fracture planes of a tall blade: side faces that lean in towards an off-centre tip, a few
 * steep chips that shape the point, and two rough breaks across the base.
 */
function buildShard(shard) {
  const rand = mulberry32(shard.seed);
  const range = (min, max) => min + rand() * (max - min);
  const planes = [];
  const origins = [];

  const add = (x, y, z, d) => {
    const n = new THREE.Vector3(x, y, z).normalize();
    planes.push(new THREE.Vector4(n.x, n.y, n.z, d));
    // Strike point: on the face, pushed towards one of its edges.
    const helper = Math.abs(n.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    const u = new THREE.Vector3().crossVectors(n, helper).normalize();
    const v = new THREE.Vector3().crossVectors(n, u);
    const angle = rand() * Math.PI * 2;
    const reach = range(0.5, 1.1);
    origins.push(
      n.clone().multiplyScalar(d)
        .addScaledVector(u, Math.cos(angle) * reach)
        .addScaledVector(v, Math.sin(angle) * reach)
    );
  };

  const sides = PLANE_COUNT - 5;
  for (let i = 0; i < sides; i++) {
    const azimuth = ((i + (rand() - 0.5) * 0.9) / sides) * Math.PI * 2;
    const lean = i % 2 ? range(shard.lean[0], shard.lean[1]) : range(-0.1, 0.16);
    const flat = 1 - shard.flatten * Math.abs(Math.sin(azimuth));
    add(Math.cos(azimuth), lean, Math.sin(azimuth), range(shard.width[0], shard.width[1]) * flat);
  }
  for (let i = 0; i < 3; i++) {
    const azimuth = rand() * Math.PI * 2;
    const steep = range(0.5, 1.1);
    add(Math.cos(azimuth) * steep, 1, Math.sin(azimuth) * steep, shard.tip * range(0.62, 0.8));
  }
  for (let i = 0; i < 2; i++) {
    add(range(-0.45, 0.45), -1, range(-0.45, 0.45), shard.base * range(0.85, 1.05));
  }
  return { planes, origins, radius: shard.boundingRadius };
}

export function mountObsidianScene(container, settings, { reducedMotion, coarsePointer, onReady, onError }) {
  const { shard, glass, palette, lights, camera: cam, motion, rendering } = settings;

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
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new THREE.PlaneGeometry(2, 2);
  const { planes, origins, radius } = buildShard(shard);
  const rotation = new THREE.Matrix3();

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: fragment(coarsePointer ? rendering.samplesMobile : rendering.samplesDesktop),
    depthTest: false,
    depthWrite: false,
    blending: THREE.NoBlending,
    uniforms: {
      uPlanes: { value: planes },
      uOrigins: { value: origins },
      uRot: { value: rotation },
      uCentre: { value: new THREE.Vector3() },
      uCam: { value: new THREE.Vector3() },
      uView: { value: new THREE.Vector2(1, 1) },
      uPixel: { value: new THREE.Vector2(0.001, 0.001) },
      uRadius: { value: radius },
      uViolet: { value: hexToVec3(palette.violet) },
      uCyan: { value: hexToVec3(palette.cyan) },
      uBone: { value: hexToVec3(palette.bone) },
      uLights: { value: new THREE.Vector4(lights.key, lights.violet, lights.cyan, lights.exposure) },
      uKeyDir: { value: new THREE.Vector3(0, 1, 0) },
      uLamp: { value: new THREE.Vector2() },
      uGlass: { value: new THREE.Vector4(glass.ripple, glass.rippleFrequency, glass.absorption, glass.edgeHighlight) },
      uCalm: { value: 0 },
    },
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  /* ---------- Layout & pose ---------- */
  const pointer = { nx: 0, ny: 0, tnx: 0, tny: 0 };
  const euler = new THREE.Euler();
  const matrix4 = new THREE.Matrix4();
  const camBase = new THREE.Vector3();
  let width = 0, height = 0;

  const layout = () => {
    const rect = container.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    const desktop = width >= 1024;
    renderer.setSize(width, height, false);
    const tanF = Math.tan(THREE.MathUtils.degToRad(desktop ? cam.fovDesktop : cam.fovMobile) / 2);
    material.uniforms.uView.value.set(tanF * (width / height), tanF);
    material.uniforms.uPixel.value.set(2 / (width * dpr), 2 / (height * dpr));
    material.uniforms.uCentre.value.fromArray(desktop ? shard.centreDesktop : shard.centreMobile);
    camBase.set(0, 0, desktop ? cam.distanceDesktop : cam.distanceMobile);
  };

  const pose = (t) => {
    euler.set(
      shard.tilt[0] + pointer.ny * motion.pointerTilt,
      shard.tilt[1] + t * motion.turnSpeed + pointer.nx * motion.pointerTurn,
      shard.tilt[2],
      'YXZ'
    );
    rotation.setFromMatrix4(matrix4.makeRotationFromEuler(euler));
    material.uniforms.uCam.value.set(
      camBase.x + pointer.nx * cam.parallax[0],
      camBase.y + pointer.ny * cam.parallax[1],
      camBase.z
    );
    // The mouse carries the key light and nudges the lamps behind the glass.
    material.uniforms.uKeyDir.value
      .set(lights.keyDir[0] + pointer.nx * lights.keyReach[0], lights.keyDir[1] + pointer.ny * lights.keyReach[1], lights.keyDir[2])
      .normalize();
    material.uniforms.uLamp.value.set(pointer.nx * lights.lampReach, pointer.ny * lights.lampReach);
  };

  /* ---------- Loop ---------- */
  const hero = document.querySelector('#main-content section');
  const rootEl = container.closest('[data-theme]') || container.parentElement || container;
  let rafId = 0, lastTime = 0, elapsed = 0, disposed = false, readySent = false, inHero = true;
  const minFrameMs = 1000 / (coarsePointer ? rendering.mobileFps : rendering.desktopFps) - 1;

  const render = () => {
    material.uniforms.uCalm.value = parseFloat(getComputedStyle(rootEl).getPropertyValue('--section-calm') || '0');
    pose(elapsed);
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
    const k = 1 - Math.exp(-dt * motion.pointerEase);
    pointer.nx += (pointer.tnx - pointer.nx) * k;
    pointer.ny += (pointer.tny - pointer.ny) * k;
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
    pointer.tnx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
    pointer.tny = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
  };
  const clearPointer = () => {
    pointer.tnx = 0;
    pointer.tny = 0;
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
