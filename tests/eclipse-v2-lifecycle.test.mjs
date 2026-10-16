import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import * as appearance from '../src/components/digital-sculpture/eclipse-v2/appearance.js';
import { DIGITAL_ECLIPSE_V2_SETTINGS } from '../src/components/digital-sculpture/settings.js';

// Keep the browser-only module isolated while exercising its real drawing code.
// Next resolves this extensionless import; the VM supplies the same exports.
const sceneSource = readFileSync(new URL('../src/components/digital-sculpture/eclipse-v2/scene.js', import.meta.url), 'utf8')
  .replace(/^import .* from ['"]\.\/appearance['"];?\r?\n/m, '')
  .replace('export function mountEclipseV2Scene', 'function mountEclipseV2Scene');

function eventTarget() {
  const listeners = new Map();
  const registrations = [];
  return {
    listeners,
    registrations,
    addEventListener(type, callback, options) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(callback);
      registrations.push({ type, options });
    },
    removeEventListener(type, callback) {
      listeners.get(type)?.delete(callback);
      if (listeners.get(type)?.size === 0) listeners.delete(type);
    },
    emit(type, event = {}) {
      for (const callback of listeners.get(type) || []) callback(event);
    },
  };
}

function canvasContext() {
  const counts = Object.create(null);
  const last = Object.create(null);
  const context = { counts, last };
  for (const name of ['setTransform', 'clearRect', 'save', 'restore', 'translate', 'scale', 'rotate', 'beginPath', 'closePath', 'rect', 'arc', 'ellipse', 'moveTo', 'lineTo', 'quadraticCurveTo', 'bezierCurveTo', 'stroke', 'fill', 'fillRect', 'clip', 'drawImage']) {
    context[name] = (...args) => {
      counts[name] = (counts[name] || 0) + 1;
      last[name] = args;
    };
  }
  context.createRadialGradient = context.createLinearGradient = () => ({ addColorStop() {} });
  return context;
}

function mount({ reduced = false, coarse = false, hidden = false } = {}) {
  const canvases = [];
  const pending = new Map();
  const observers = [];
  let frameNumber = 0;
  let time = 1000;
  let readyCount = 0;
  const errors = [];
  const bounds = { left: 0, top: 0, width: 1440, height: 900 };
  const heroBounds = { top: 100, height: 700, bottom: 800 };
  const hero = { getBoundingClientRect: () => heroBounds };
  const container = {
    children: [],
    getBoundingClientRect: () => bounds,
    appendChild(canvas) { this.children.push(canvas); canvas.parent = this; },
  };
  const motion = Object.assign(eventTarget(), { matches: reduced });
  const pointer = Object.assign(eventTarget(), { matches: coarse });
  const document = Object.assign(eventTarget(), {
    hidden,
    querySelector: () => hero,
    createElement(tag) {
      assert.equal(tag, 'canvas');
      const context = canvasContext();
      const canvas = {
        context, width: 0, height: 0, style: {}, attributes: {},
        setAttribute(key, value) { this.attributes[key] = value; },
        getContext: () => context,
        remove() { if (this.parent) this.parent.children = this.parent.children.filter((child) => child !== this); },
      };
      canvases.push(canvas);
      return canvas;
    },
  });
  const window = Object.assign(eventTarget(), {
    devicePixelRatio: 2,
    scrollY: 0,
    matchMedia: (query) => query.includes('prefers-reduced-motion') ? motion : pointer,
  });
  class ResizeObserver {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    disconnect() { this.targets.clear(); this.disconnected = true; }
    trigger() { this.callback(); }
  }
  const mountScene = vm.runInNewContext(`${sceneSource}\nmountEclipseV2Scene;`, {
    ...appearance, document, window, ResizeObserver,
    requestAnimationFrame(callback) { pending.set(++frameNumber, callback); return frameNumber; },
    cancelAnimationFrame(id) { pending.delete(id); },
  }, { filename: 'eclipse-v2/scene.js' });
  const dispose = mountScene(container, DIGITAL_ECLIPSE_V2_SETTINGS, {
    onReady() { readyCount++; },
    onError(error) { errors.push(error); },
  });
  return {
    canvases, pending, observers, bounds, heroBounds, container, document, window, motion, pointer, dispose, errors,
    get readyCount() { return readyCount; },
    tick() {
      time += 100;
      const callbacks = [...pending.values()];
      pending.clear();
      for (const callback of callbacks) callback(time);
    },
  };
}

test('hidden tabs stop rendering and resume with a single scheduled frame', (t) => {
  const scene = mount();
  t.after(scene.dispose);
  assert.equal(scene.pending.size, 1);
  scene.tick();
  assert.equal(scene.readyCount, 1);
  assert.equal(scene.pending.size, 1);
  const draws = scene.canvases[0].context.counts.drawImage;
  scene.document.hidden = true;
  scene.document.emit('visibilitychange');
  assert.equal(scene.pending.size, 0);
  scene.tick();
  assert.equal(scene.canvases[0].context.counts.drawImage, draws);
  scene.document.hidden = false;
  scene.document.emit('visibilitychange');
  scene.document.emit('visibilitychange');
  assert.equal(scene.pending.size, 1);
  scene.tick();
  assert.equal(scene.readyCount, 1);
  assert.ok(scene.canvases[0].context.counts.drawImage > draws);
  assert.equal(scene.errors.length, 0);
});

test('an initially hidden tab waits for visibility before its first render', (t) => {
  const scene = mount({ hidden: true });
  t.after(scene.dispose);
  assert.equal(scene.pending.size, 0);
  assert.equal(scene.readyCount, 0);
  scene.document.hidden = false;
  scene.document.emit('visibilitychange');
  scene.tick();
  assert.equal(scene.readyCount, 1);
  assert.equal(scene.pending.size, 1);
});

test('reduced motion renders once and live preference changes stop or resume animation', (t) => {
  const scene = mount({ reduced: true });
  t.after(scene.dispose);
  scene.tick();
  assert.equal(scene.readyCount, 1);
  assert.equal(scene.pending.size, 0);
  const draws = scene.canvases[0].context.counts.drawImage;
  scene.window.emit('pointermove', { pointerType: 'mouse', clientX: 1200, clientY: 400 });
  scene.tick();
  assert.equal(scene.canvases[0].context.counts.drawImage, draws);
  scene.motion.matches = false;
  scene.motion.emit('change');
  scene.tick();
  assert.equal(scene.pending.size, 1);
  scene.motion.matches = true;
  scene.motion.emit('change');
  assert.equal(scene.pending.size, 1);
  scene.tick();
  assert.equal(scene.pending.size, 0);
  assert.equal(scene.readyCount, 1);
});

test('scrolling below the hero pauses rendering until the hero returns', (t) => {
  const scene = mount();
  t.after(scene.dispose);
  scene.tick();
  scene.heroBounds.bottom = -10;
  scene.window.emit('scroll');
  assert.equal(scene.pending.size, 0);
  scene.heroBounds.bottom = 600;
  scene.window.emit('scroll');
  assert.equal(scene.pending.size, 1);
  scene.tick();
  assert.equal(scene.pending.size, 1);
});

test('resizing rebuilds the cached corona and applies the mobile pixel-ratio limit', (t) => {
  const scene = mount({ reduced: true });
  t.after(scene.dispose);
  scene.tick();
  const cache = scene.canvases[1];
  const initialSize = cache.width;
  const initialStrokes = cache.context.counts.stroke;
  assert.equal(scene.observers[0].targets.size, 2);
  scene.bounds.width = 390;
  scene.bounds.height = 844;
  scene.observers[0].trigger();
  assert.equal(scene.canvases[0].width, 585);
  assert.equal(scene.canvases[0].height, 1266);
  assert.notEqual(cache.width, initialSize);
  assert.ok(cache.context.counts.stroke > initialStrokes);
  assert.equal(scene.pending.size, 1);
  scene.tick();
  assert.equal(scene.pending.size, 0);
  assert.equal(scene.errors.length, 0);
});

test('pointer response is damped, recovers, and never captures navigation or scrolling input', (t) => {
  const scene = mount();
  t.after(scene.dispose);
  scene.tick();
  const ctx = scene.canvases[0].context;
  const baseX = ctx.last.translate[0];
  let cancellations = 0;
  scene.window.emit('pointermove', {
    pointerType: 'mouse', clientX: 1200, clientY: 400,
    preventDefault() { cancellations++; },
  });
  for (let i = 0; i < 12; i++) scene.tick();
  const activeOffset = Math.abs(ctx.last.translate[0] - baseX);
  assert.ok(activeOffset > 0.1);
  assert.ok(activeOffset < DIGITAL_ECLIPSE_V2_SETTINGS.animation.parallaxPixels);
  scene.document.emit('mouseleave');
  for (let i = 0; i < 30; i++) scene.tick();
  assert.ok(Math.abs(ctx.last.translate[0] - baseX) < activeOffset * 0.05);
  assert.equal(cancellations, 0);
  const registrations = [...scene.window.registrations, ...scene.document.registrations];
  assert.ok(registrations.filter(({ type }) => ['scroll', 'pointermove'].includes(type)).every(({ options }) => options?.passive));
  assert.ok(registrations.every(({ type, options }) => !['pointerdown', 'mousedown', 'wheel', 'touchstart', 'touchmove'].includes(type) && !options?.capture));
  assert.match(scene.canvases[0].style.cssText, /pointer-events:none/);
});

test('coarse pointers do not activate parallax', (t) => {
  const scene = mount({ coarse: true });
  t.after(scene.dispose);
  scene.tick();
  const ctx = scene.canvases[0].context;
  const base = [...ctx.last.translate];
  scene.window.emit('pointermove', { pointerType: 'touch', clientX: 1200, clientY: 400 });
  for (let i = 0; i < 5; i++) scene.tick();
  assert.deepEqual(ctx.last.translate, base);
  scene.window.emit('pointermove', { pointerType: 'mouse', clientX: 1200, clientY: 400 });
  scene.tick();
  assert.deepEqual(ctx.last.translate, base);
});

test('disposal cancels RAF, removes listeners and canvas, and frees backing stores', () => {
  const scene = mount();
  scene.tick();
  scene.dispose();
  scene.dispose();
  assert.equal(scene.pending.size, 0);
  assert.equal(scene.container.children.length, 0);
  assert.equal(scene.observers[0].disconnected, true);
  assert.equal(scene.observers[0].targets.size, 0);
  for (const target of [scene.window, scene.document, scene.motion, scene.pointer]) assert.equal(target.listeners.size, 0);
  for (const canvas of scene.canvases) {
    assert.equal(canvas.width, 1);
    assert.equal(canvas.height, 1);
  }
  scene.document.emit('visibilitychange');
  scene.window.emit('scroll');
  assert.equal(scene.pending.size, 0);
});

test('a drawing failure reports the error and disposes rendering resources', () => {
  const scene = mount();
  const failure = new Error('Mock draw failure');
  scene.canvases[0].context.drawImage = () => { throw failure; };
  scene.tick();
  assert.equal(scene.errors.length, 1);
  assert.equal(scene.errors[0], failure);
  assert.equal(scene.readyCount, 0);
  assert.equal(scene.pending.size, 0);
  assert.equal(scene.container.children.length, 0);
  assert.equal(scene.window.listeners.size, 0);
  assert.equal(scene.document.listeners.size, 0);
  assert.equal(scene.observers[0].disconnected, true);
});
