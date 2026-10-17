import { RADIUS, EXTENT, createCorona, paintRestingCorona, drawLight, drawCoronaParticles } from './appearance';

/** A front-facing, layered particle-based data ring. Atmospheric glow is
 * cached on resize; each frame renders animated radial particle streams,
 * travelling activation pulses, outward data flow, and gentle breathing.
 * No pointer capture, drag handlers or touch cancellation: content stays native.
 */
export function mountEclipseV2Scene(container, settings, { onReady, onError }) {
  const canvas = document.createElement('canvas');
  const cache = document.createElement('canvas');
  const lightCache = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  const cached = cache.getContext('2d', { alpha: true });
  const cachedLight = lightCache.getContext('2d', { alpha: true });
  if (!ctx || !cached || !cachedLight) throw new Error('Canvas rendering is unavailable');
  canvas.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none';
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = window.matchMedia('(pointer: coarse)');
  const hero = document.querySelector('#main-content section');
  const target = { x: 0, y: 0, active: 0 };
  const current = { x: 0, y: 0, active: 0, parallaxX: 0, parallaxY: 0 };
  let width = 0, height = 0, dpr = 1, radius = 1, centreX = 0, centreY = 0;
  let cacheScale = 1, cacheSize = 1, corona, compact = false;
  let frameId = 0, lastFrame = 0, elapsed = 0, disposed = false, ready = false;
  let inHero = true;

  function stop() {
    cancelAnimationFrame(frameId);
    frameId = 0;
    lastFrame = 0;
  }

  function requestFrame() {
    if (!disposed && !document.hidden && inHero && !frameId) frameId = requestAnimationFrame(frame);
  }

  function resize() {
    const rect = container.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    compact = width < 1024;
    dpr = Math.min(window.devicePixelRatio || 1, compact ? settings.rendering.maxPixelRatioMobile : settings.rendering.maxPixelRatioDesktop);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const heroRect = hero?.getBoundingClientRect();
    const heroTop = (heroRect?.top ?? 130) + window.scrollY;
    const heroHeight = heroRect?.height ?? height * 0.65;
    radius = compact ? Math.min(width * 0.34, 215) : Math.min(width * 0.17, height * 0.29);
    centreX = width * (compact ? 0.66 : 0.75);
    centreY = Math.min(heroTop + heroHeight * (compact ? 0.43 : 0.46), height * 0.53);
    const scale = radius / RADIUS;
    cacheScale = scale * dpr;
    cacheSize = Math.ceil(EXTENT * 2 * cacheScale);
    cache.width = cacheSize;
    cache.height = cacheSize;
    lightCache.width = cacheSize;
    lightCache.height = cacheSize;
    cached.setTransform(cacheScale, 0, 0, cacheScale, cacheSize / 2, cacheSize / 2);
    corona = createCorona(settings.corona, compact);
    paintRestingCorona(cached, corona, settings.corona);
    cachedLight.setTransform(cacheScale, 0, 0, cacheScale, cacheSize / 2, cacheSize / 2);
    drawLight(cachedLight, settings.corona);
    requestFrame();
  }

  function draw(dt) {
    const damping = 1 - Math.exp(-dt * 5);
    current.x += (target.x - current.x) * damping;
    current.y += (target.y - current.y) * damping;
    current.active += (target.active - current.active) * damping;
    const moving = !motion.matches && !pointer.matches;
    const parallax = moving ? settings.animation.parallaxPixels * current.active : 0;
    current.parallaxX = (current.x / width - 0.5) * parallax;
    current.parallaxY = (current.y / height - 0.5) * parallax;
    const x = centreX + current.parallaxX;
    const y = centreY + current.parallaxY;
    const scale = radius / RADIUS;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(x, y);
    // An opaque near-black centre; no animated particles can enter it.
    ctx.fillStyle = '#030608';
    ctx.beginPath();
    ctx.arc(0, 0, radius + 0.2, 0, Math.PI * 2);
    ctx.fill();
    const size = cacheSize / dpr;
    ctx.drawImage(cache, -size / 2, -size / 2, size, size);
    if (!motion.matches) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.14 + 0.11 * Math.sin(elapsed * (settings.animation.breathingSpeed ?? 1.25));
      ctx.drawImage(lightCache, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
    ctx.scale(scale, scale);
    const pointerState = moving && current.active > 0.005 ? {
      active: current.active,
      localX: (current.x - x) / scale,
      localY: (current.y - y) / scale,
      reach: settings.animation.pointerReach / scale,
    } : null;
    drawCoronaParticles(
      ctx,
      corona,
      settings.corona,
      settings.animation,
      motion.matches ? 0 : elapsed,
      pointerState
    );
    // Keep the inner void clean and dark beneath inner-edge halos.
    ctx.fillStyle = '#030608';
    ctx.beginPath();
    ctx.arc(0, 0, RADIUS - 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    if (!ready) { ready = true; onReady?.(); }
  }

  function frame(now) {
    frameId = 0;
    if (disposed || document.hidden || !inHero) return;
    const fps = compact ? settings.rendering.mobileFps : settings.rendering.desktopFps;
    if (lastFrame && now - lastFrame < 1000 / fps - 1) { requestFrame(); return; }
    const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.08) : 1 / fps;
    lastFrame = now;
    if (!motion.matches) elapsed += dt * settings.animation.speed;
    try { draw(dt); } catch (error) { dispose(); onError?.(error); return; }
    if (!motion.matches) requestFrame();
  }

  function onPointer(event) {
    if (motion.matches || pointer.matches || event.pointerType !== 'mouse') return;
    const rect = container.getBoundingClientRect();
    target.x = event.clientX - rect.left;
    target.y = event.clientY - rect.top;
    target.active = 1;
  }
  function clearPointer() { target.active = 0; }
  function visibility() { if (document.hidden) stop(); else requestFrame(); }
  function motionChange() { stop(); clearPointer(); elapsed = 0; requestFrame(); }
  function onScroll() {
    const rect = hero?.getBoundingClientRect();
    inHero = !rect || rect.bottom > height * 0.15;
    if (inHero) requestFrame(); else stop();
  }
  const observer = new ResizeObserver(() => {
    try { resize(); } catch (error) { dispose(); onError?.(error); }
  });
  function dispose() {
    if (disposed) return;
    disposed = true;
    stop();
    observer.disconnect();
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('blur', clearPointer);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('mouseleave', clearPointer);
    document.removeEventListener('visibilitychange', visibility);
    motion.removeEventListener('change', motionChange);
    pointer.removeEventListener('change', motionChange);
    canvas.remove();
    canvas.width = cache.width = lightCache.width = 1;
    canvas.height = cache.height = lightCache.height = 1;
    corona = null;
  }

  try {
    observer.observe(container);
    if (hero) observer.observe(hero);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('blur', clearPointer);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', clearPointer);
    document.addEventListener('visibilitychange', visibility);
    motion.addEventListener('change', motionChange);
    pointer.addEventListener('change', motionChange);
    resize();
    onScroll();
  } catch (error) { dispose(); throw error; }
  return dispose;
}
