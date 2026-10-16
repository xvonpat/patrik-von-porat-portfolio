'use client';

import { useEffect, useRef, useState } from 'react';
import { SCULPTURE_SETTINGS } from './settings';
import styles from './DigitalSculpture.module.css';

/**
 * Interactive Digital Sculpture for the homepage hero.
 *
 * An abstract computational sculpture made of fine curved contour lines,
 * short dashed strokes, and faint points of light. Features local magnetic-field
 * deformation, slow idle wave undulation, traveling data pulses, and free drag rotation.
 *
 * Loads dynamically during idle time to guarantee zero blocking of page text and navigation.
 */
export default function DigitalSculpture({ className = '' }) {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | failed

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let rafId = 0;
    const updateSectionCalm = () => {
      rafId = 0;
      const vh = Math.max(1, window.innerHeight || 1);
      const selectedWorkEl = document.getElementById('selected-work');
      let progress = 0;

      const scrollY = window.scrollY || 0;
      if (selectedWorkEl && scrollY > 4) {
        const rect = selectedWorkEl.getBoundingClientRect();
        const startY = vh * 0.90;
        const endY = vh * 0.36;
        const raw = (startY - rect.top) / Math.max(1, startY - endY);
        const clamped = Math.max(0, Math.min(1, raw));
        // Smoothstep easing for a gradual, cutoff-free transition
        progress = clamped * clamped * (3 - 2 * clamped);
      } else if (scrollY > 4) {
        const raw = scrollY / (vh * 0.55);
        const clamped = Math.max(0, Math.min(1, raw));
        progress = clamped * clamped * (3 - 2 * clamped);
      }

      root.style.setProperty('--section-calm', progress.toFixed(3));
    };

    const onScrollOrResize = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateSectionCalm);
      }
    };

    updateSectionCalm();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let dispose = null;
    let cancelled = false;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const fail = (error) => {
      if (error) console.warn('[DigitalSculpture] 3D view unavailable:', error.message || error);
      dispose?.();
      dispose = null;
      if (!cancelled) setStatus('failed');
    };

    // Load after the browser is idle so hero content is immediately accessible
    const schedule = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 60));
    const cancelSchedule = window.cancelIdleCallback || window.clearTimeout;

    const handle = schedule(async () => {
      try {
        const { mountSculptureScene } = await import('./scene');
        if (cancelled) return;

        dispose = mountSculptureScene(container, SCULPTURE_SETTINGS, {
          reducedMotion,
          coarsePointer,
          onReady: () => !cancelled && setStatus('ready'),
          onError: fail,
        });
      } catch (error) {
        fail(error);
      }
    }, { timeout: 1200 });

    return () => {
      cancelled = true;
      cancelSchedule(handle);
      dispose?.();
      dispose = null;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${styles.sculptureBackground} digital-sculpture ${className}`}
      data-status={status}
      aria-hidden="true"
    >
      {/* Computational ambient aura */}
      <div className={styles.haze} />
      {/* 3D Topographic Landscape Stage */}
      <div ref={containerRef} className={`${styles.stage} digital-sculpture__stage`} />
      {/* Feathered readability darkening behind hero text and lower section entrance */}
      <div className={styles.readabilityMask} />
      {/* Scroll-aligned calming veil for the Selected Work section and below */}
      <div className={styles.sectionCalmVeil} />
    </div>
  );
}
