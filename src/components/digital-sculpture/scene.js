import * as THREE from 'three';
import { createSculptureGeometries } from './geometry';
import { createSculptureMaterials } from './materials';
import { SculptureController } from './interaction';

/**
 * Mounts the real-time 3D topographic landscape scene into `container`.
 * Loaded dynamically during browser idle time to preserve initial page speed.
 *
 * @returns {() => void} dispose
 */
export function mountSculptureScene(
  container,
  settings,
  { reducedMotion, coarsePointer, onReady, onError }
) {
  const { cameraFraming, contourSpacing, terrainScale, parallaxStrength, rendering } = settings;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    premultipliedAlpha: true,
    powerPreference: coarsePointer ? 'default' : 'high-performance',
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const maxDpr = coarsePointer ? rendering.maxPixelRatioMobile : rendering.maxPixelRatioDesktop;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

  const canvas = renderer.domElement;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(cameraFraming.fovDesktop || 33, 1, 0.5, 120);

  // Build deterministic 3D terrain mesh, Marching Squares elevation contours, and magenta routes
  const { terrainGeometry, contourGeometry, magentaGeometry } = createSculptureGeometries({
    theme: settings.id || 'contour-flow',
    isMobile: coarsePointer,
    terrainScale,
    contourSpacing,
  });
  const { terrainMaterial, contourMaterial, magentaMaterial } = createSculptureMaterials(settings);

  const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
  terrainMesh.renderOrder = 0;

  const contourLines = new THREE.LineSegments(contourGeometry, contourMaterial);
  contourLines.renderOrder = 1;

  const magentaLines = new THREE.LineSegments(magentaGeometry, magentaMaterial);
  magentaLines.renderOrder = 2;

  const landscapeGroup = new THREE.Group();
  landscapeGroup.add(terrainMesh);
  landscapeGroup.add(contourLines);
  landscapeGroup.add(magentaLines);
  scene.add(landscapeGroup);

  const controller = new SculptureController({
    cameraFraming,
    parallaxStrength,
    reducedMotion,
  });

  /* ---------- Sizing & Camera Framing ---------- */

  const fitCamera = (w, h) => {
    const isDesktop = w >= 1024;
    const aspect = w / h;
    camera.aspect = aspect;
    camera.fov = isDesktop ? cameraFraming.fovDesktop || 33 : cameraFraming.fovMobile || 42;

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

  /* ---------- Animation Loop (Paused Offscreen / Hidden Tab) ---------- */

  let rafId = 0;
  let running = false;
  let onScreen = true;
  let lastTime = performance.now();
  let lastRender = 0;
  let disposed = false;
  let readySent = false;
  const minFrameMs = coarsePointer ? 1000 / rendering.mobileFps : 0;

  const renderFrame = (now) => {
    controller.applyToCamera(camera);

    const timeSeconds = reducedMotion ? 0.0 : now * 0.001;

    terrainMaterial.uniforms.uTime.value = timeSeconds;
    contourMaterial.uniforms.uTime.value = timeSeconds;
    magentaMaterial.uniforms.uTime.value = timeSeconds;

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
    renderFrame(now);
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

  /* ---------- Pointer Parallax & Constrained Drag Interaction ---------- */

  let activePointer = null;
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
    // Preserve 100% native vertical scrolling on touch devices
    if (e.pointerType === 'touch') return;
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    if (activePointer !== null) return;

    // Do not intercept clicks on foreground text, buttons, links, or navigation
    if (isInteractiveOrContent(e.target)) return;

    activePointer = e.pointerId;
    lastX = e.clientX;
    lastY = e.clientY;

    controller.beginDrag(e.timeStamp || performance.now());
    document.body.style.cursor = 'grabbing';
    requestFrame();
  };

  const onPointerMove = (e) => {
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
    if (activePointer !== null) return;
    controller.clearPointer();
    requestFrame();
  };

  const onBlur = () => {
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

  /* ---------- WebGL Context Handling ---------- */

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

    terrainGeometry.dispose();
    contourGeometry.dispose();
    magentaGeometry.dispose();
    terrainMaterial.dispose();
    contourMaterial.dispose();
    magentaMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss?.();
    canvas.remove();
  };
}
