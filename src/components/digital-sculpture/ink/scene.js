import * as THREE from 'three';

/**
 * Ink in Water — a GPU fluid simulation (stable fluids) where drops of violet, cyan and
 * rose ink fall into still water, bloom and curl into tendrils before slowly dissolving.
 *
 * Velocity and dye live in half-float render targets; each frame runs the classic
 * curl → vorticity → divergence → pressure → projection → advection passes. Drops are
 * released on their own every few seconds; pointer movement drags the water and a click
 * on empty background releases a drop where you click.
 */

const VERTEX = `
  uniform vec2 texelSize;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  void main() {
    vUv = uv;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const SHADERS = {
  splat: `
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    varying vec2 vUv;
    void main() {
      vec2 p = vUv - point;
      p.x *= aspectRatio;
      vec3 splat = exp(-dot(p, p) / radius) * color;
      gl_FragColor = vec4(texture2D(uTarget, vUv).xyz + splat, 1.0);
    }
  `,
  advection: `
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;
    varying vec2 vUv;
    void main() {
      vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
      gl_FragColor = texture2D(uSource, coord) / (1.0 + dissipation * dt);
    }
  `,
  divergence: `
    uniform sampler2D uVelocity;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    void main() {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;
      vec2 C = texture2D(uVelocity, vUv).xy;
      // Walls: the water is contained by the edges of the viewport.
      if (vL.x < 0.0) L = -C.x;
      if (vR.x > 1.0) R = -C.x;
      if (vT.y > 1.0) T = -C.y;
      if (vB.y < 0.0) B = -C.y;
      gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
    }
  `,
  curl: `
    uniform sampler2D uVelocity;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    void main() {
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
    }
  `,
  vorticity: `
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    void main() {
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;
      vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      force /= length(force) + 0.0001;
      force *= curl * C;
      force.y *= -1.0;
      vec2 velocity = texture2D(uVelocity, vUv).xy + force * dt;
      gl_FragColor = vec4(clamp(velocity, -1000.0, 1000.0), 0.0, 1.0);
    }
  `,
  pressure: `
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    void main() {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float divergence = texture2D(uDivergence, vUv).x;
      gl_FragColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
    }
  `,
  gradientSubtract: `
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    void main() {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 velocity = texture2D(uVelocity, vUv).xy - vec2(R - L, T - B);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `,
  scale: `
    uniform sampler2D uTexture;
    uniform float value;
    varying vec2 vUv;
    void main() {
      gl_FragColor = value * texture2D(uTexture, vUv);
    }
  `,
  display: `
    uniform sampler2D uDye;
    uniform vec3 uBone;
    uniform float uCalm;
    uniform float uIntensity;
    varying vec2 vUv;
    void main() {
      vec3 dye = texture2D(uDye, vUv).rgb * uIntensity;
      // Soft saturation keeps dense ink from blowing out into neon.
      vec3 col = 1.0 - exp(-dye * 1.5);
      float a = clamp(max(col.r, max(col.g, col.b)) * 1.1, 0.0, 0.88);
      // The densest cores turn milky, like pigment just before it disperses.
      col = mix(col, uBone * a, smoothstep(0.5, 0.9, a) * 0.35);
      float calm = 1.0 - uCalm * 0.7;
      gl_FragColor = vec4(col * calm, a * calm);
    }
  `,
};

function hexToVec3(hex) {
  const v = parseInt(hex.replace('#', ''), 16);
  return new THREE.Vector3(((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255);
}

function isInteractiveOrContent(target) {
  if (!target || !(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      'a, button, input, textarea, select, label, [role="button"], [role="link"], p, h1, h2, h3, h4, h5, h6, span, li, blockquote, code, pre, nav, footer, [data-interactive], img, svg, iframe'
    )
  );
}

export function mountInkScene(container, settings, { reducedMotion, coarsePointer, onReady, onError }) {
  const { fluid, drops, palette, rendering } = settings;

  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true,
    premultipliedAlpha: true,
    depth: false,
    stencil: false,
    powerPreference: coarsePointer ? 'default' : 'high-performance',
  });
  if (!renderer.extensions.has('EXT_color_buffer_float') && !renderer.extensions.has('EXT_color_buffer_half_float')) {
    renderer.dispose();
    throw new Error('Half-float render targets are unavailable');
  }
  renderer.setClearColor(0x000000, 0);
  renderer.autoClear = false;
  const maxDpr = coarsePointer ? rendering.maxPixelRatioMobile : rendering.maxPixelRatioDesktop;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

  const canvas = renderer.domElement;
  canvas.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none';
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  /* ---------- Full-screen pass plumbing ---------- */
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quadScene = new THREE.Scene();
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
  quad.frustumCulled = false;
  quadScene.add(quad);

  const materials = {};
  for (const [name, fragmentShader] of Object.entries(SHADERS)) {
    materials[name] = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader,
      uniforms: { texelSize: { value: new THREE.Vector2() } },
      depthTest: false,
      depthWrite: false,
      blending: name === 'display' ? THREE.NormalBlending : THREE.NoBlending,
      transparent: name === 'display',
    });
  }

  const pass = (name, target, uniforms) => {
    const material = materials[name];
    for (const [key, value] of Object.entries(uniforms)) {
      if (!material.uniforms[key]) material.uniforms[key] = { value };
      else material.uniforms[key].value = value;
    }
    quad.material = material;
    renderer.setRenderTarget(target);
    renderer.render(quadScene, camera);
  };

  const createTarget = (w, h) =>
    new THREE.WebGLRenderTarget(w, h, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      stencilBuffer: false,
    });

  const createDouble = (w, h) => {
    const pair = { read: createTarget(w, h), write: createTarget(w, h) };
    pair.swap = () => {
      const t = pair.read;
      pair.read = pair.write;
      pair.write = t;
    };
    pair.dispose = () => {
      pair.read.dispose();
      pair.write.dispose();
    };
    return pair;
  };

  /* ---------- Simulation targets (sized to the viewport aspect) ---------- */
  let width = 0, height = 0, aspect = 1, compact = false;
  let simW = 1, simH = 1, dyeW = 1, dyeH = 1;
  let velocity = null, dye = null, pressure = null, divergence = null, curl = null;
  const simTexel = new THREE.Vector2();

  const resolution = (base) => {
    const a = width / height;
    const max = Math.round(base * Math.max(a, 1 / a));
    return a >= 1 ? [max, base] : [base, max];
  };

  const disposeTargets = () => {
    velocity?.dispose();
    dye?.dispose();
    pressure?.dispose();
    divergence?.dispose();
    curl?.dispose();
  };

  const layout = () => {
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    if (w === width && h === height) return;
    width = w;
    height = h;
    aspect = width / height;
    compact = width < 1024;
    renderer.setSize(width, height, false);
    // The water is reset on resize; ink keeps falling, so the scene refills on its own.
    disposeTargets();
    [simW, simH] = resolution(compact ? fluid.simResolutionMobile : fluid.simResolutionDesktop);
    [dyeW, dyeH] = resolution(compact ? fluid.dyeResolutionMobile : fluid.dyeResolutionDesktop);
    simTexel.set(1 / simW, 1 / simH);
    velocity = createDouble(simW, simH);
    dye = createDouble(dyeW, dyeH);
    pressure = createDouble(simW, simH);
    divergence = createTarget(simW, simH);
    curl = createTarget(simW, simH);
  };

  /* ---------- Fluid step ---------- */
  const splat = (x, y, dx, dy, color, radius) => {
    const r = (aspect > 1 ? radius * aspect : radius) / 100;
    pass('splat', velocity.write, {
      texelSize: simTexel, uTarget: velocity.read.texture, aspectRatio: aspect,
      point: new THREE.Vector2(x, y), color: new THREE.Vector3(dx, dy, 0), radius: r,
    });
    velocity.swap();
    pass('splat', dye.write, {
      texelSize: simTexel, uTarget: dye.read.texture, aspectRatio: aspect,
      point: new THREE.Vector2(x, y), color, radius: r,
    });
    dye.swap();
  };

  const step = (dt) => {
    pass('curl', curl, { texelSize: simTexel, uVelocity: velocity.read.texture });
    pass('vorticity', velocity.write, {
      texelSize: simTexel, uVelocity: velocity.read.texture, uCurl: curl.texture, curl: fluid.curl, dt,
    });
    velocity.swap();
    pass('divergence', divergence, { texelSize: simTexel, uVelocity: velocity.read.texture });
    pass('scale', pressure.write, { texelSize: simTexel, uTexture: pressure.read.texture, value: fluid.pressure });
    pressure.swap();
    for (let i = 0; i < fluid.pressureIterations; i++) {
      pass('pressure', pressure.write, {
        texelSize: simTexel, uPressure: pressure.read.texture, uDivergence: divergence.texture,
      });
      pressure.swap();
    }
    pass('gradientSubtract', velocity.write, {
      texelSize: simTexel, uPressure: pressure.read.texture, uVelocity: velocity.read.texture,
    });
    velocity.swap();
    pass('advection', velocity.write, {
      texelSize: simTexel, uVelocity: velocity.read.texture, uSource: velocity.read.texture,
      dt, dissipation: fluid.velocityDissipation,
    });
    velocity.swap();
    pass('advection', dye.write, {
      texelSize: simTexel, uVelocity: velocity.read.texture, uSource: dye.read.texture,
      dt, dissipation: fluid.dyeDissipation,
    });
    dye.swap();
  };

  /* ---------- Ink drops ---------- */
  const colors = palette.inks.map(hexToVec3);
  const live = [];
  let nextDropIn = 0.2;
  let initialDrops = drops.initialCount;

  const releaseDrop = (x, y, strength = 1) => {
    const color = colors[Math.floor(Math.random() * colors.length)].clone();
    live.push({
      x,
      y,
      vx: (Math.random() - 0.5) * drops.sideways,
      vy: -(drops.fallSpeed * (0.7 + Math.random() * 0.6)),
      age: 0,
      life: drops.life * (0.8 + Math.random() * 0.4),
      color: color.multiplyScalar(drops.inkAmount * strength),
      strength,
    });
  };

  const autoDropPosition = () => {
    const [x0, x1] = compact ? drops.spawnXMobile : drops.spawnXDesktop;
    return [x0 + Math.random() * (x1 - x0), drops.spawnY[0] + Math.random() * (drops.spawnY[1] - drops.spawnY[0])];
  };

  const updateDrops = (dt) => {
    nextDropIn -= dt;
    if (nextDropIn <= 0 && live.length < drops.maxLive) {
      releaseDrop(...autoDropPosition());
      if (initialDrops > 0) {
        initialDrops -= 1;
        nextDropIn = 0.45;
      } else {
        nextDropIn = drops.interval[0] + Math.random() * (drops.interval[1] - drops.interval[0]);
      }
    }
    for (let i = live.length - 1; i >= 0; i--) {
      const d = live[i];
      d.age += dt;
      // A drop is strongest when it enters the water and thins out as it sinks.
      const fade = Math.max(0, 1 - d.age / d.life);
      const weight = fade * fade;
      splat(d.x, d.y, d.vx * simH * drops.push, d.vy * simH * drops.push, d.color.clone().multiplyScalar(weight * dt * 60), drops.radius * (0.6 + 0.4 * d.strength));
      d.vy *= Math.exp(-dt * drops.drag);
      d.vx *= Math.exp(-dt * drops.drag);
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      if (d.age >= d.life || d.y < 0.02) live.splice(i, 1);
    }
  };

  /* ---------- Pointer: dragging through the water ---------- */
  const pointer = { x: 0, y: 0, dx: 0, dy: 0, moved: false, has: false };

  const toUv = (clientX, clientY) => {
    const rect = container.getBoundingClientRect();
    return [(clientX - rect.left) / Math.max(1, rect.width), 1 - (clientY - rect.top) / Math.max(1, rect.height)];
  };

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const [x, y] = toUv(e.clientX, e.clientY);
    if (pointer.has) {
      pointer.dx += x - pointer.x;
      pointer.dy += y - pointer.y;
      pointer.moved = true;
    }
    pointer.x = x;
    pointer.y = y;
    pointer.has = true;
  };
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || isInteractiveOrContent(e.target)) return;
    const [x, y] = toUv(e.clientX, e.clientY);
    releaseDrop(x, y, 1.4);
  };
  const clearPointer = () => { pointer.has = false; pointer.moved = false; pointer.dx = pointer.dy = 0; };

  const applyPointer = (dt) => {
    if (!pointer.moved) return;
    const vx = (pointer.dx / dt) * simH * fluid.pointerForce;
    const vy = (pointer.dy / dt) * simH * fluid.pointerForce;
    const speed = Math.min(1, Math.hypot(pointer.dx, pointer.dy) * 40);
    splat(pointer.x, pointer.y, vx, vy, colors[0].clone().multiplyScalar(fluid.pointerInk * speed), fluid.pointerRadius);
    pointer.dx = pointer.dy = 0;
    pointer.moved = false;
  };

  /* ---------- Loop ---------- */
  const hero = document.querySelector('#main-content section');
  const rootEl = container.closest('[data-theme]') || container.parentElement || container;
  const bone = hexToVec3(palette.bone);
  let rafId = 0, lastTime = 0, disposed = false, readySent = false, inHero = true;

  const display = () => {
    renderer.setRenderTarget(null);
    renderer.clear();
    pass('display', null, {
      texelSize: simTexel,
      uDye: dye.read.texture,
      uBone: bone,
      uIntensity: fluid.displayIntensity,
      uCalm: parseFloat(getComputedStyle(rootEl).getPropertyValue('--section-calm') || '0'),
    });
    if (!readySent) {
      readySent = true;
      onReady?.();
    }
  };

  const frame = (now) => {
    rafId = 0;
    if (disposed || document.hidden || !inHero) return;
    const minFrameMs = 1000 / (compact || coarsePointer ? rendering.mobileFps : rendering.desktopFps) - 1;
    if (lastTime && now - lastTime < minFrameMs) {
      rafId = requestAnimationFrame(frame);
      return;
    }
    const dt = lastTime ? Math.min((now - lastTime) / 1000, 1 / 30) : 1 / 60;
    lastTime = now;
    try {
      applyPointer(dt);
      updateDrops(dt);
      step(dt);
      display();
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

  // Still picture for reduced motion: let a few drops bloom off-screen, then draw once.
  const renderStill = () => {
    live.length = 0;
    for (let i = 0; i < drops.initialCount + 1; i++) releaseDrop(...autoDropPosition());
    for (let s = 0; s < 150; s++) {
      updateDrops(1 / 60);
      step(1 / 60);
    }
    display();
  };

  const ro = new ResizeObserver(() => {
    try {
      const before = width;
      layout();
      if (reducedMotion && before !== width) renderStill();
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
    disposeTargets();
    Object.values(materials).forEach((m) => m.dispose());
    quad.geometry.dispose();
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
      renderStill();
    } else {
      if (!coarsePointer) {
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerdown', onPointerDown);
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
