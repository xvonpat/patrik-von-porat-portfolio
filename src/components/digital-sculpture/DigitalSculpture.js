'use client';

import { useEffect, useRef, useState } from 'react';
import { getSculptureSettings } from './settings';
import styles from './DigitalSculpture.module.css';

/**
 * Interactive Digital Sculpture for the homepage hero.
 *
 * Supports selectable themes:
 * - 'harmonic-nexus' (Default): 3D cymatic strings & attractor field
 * - 'chladni-plate': Sand settling into the nodal lines of a vibrating plate
 * - 'ink-in-water': Ink drops blooming in still water (GPU fluid simulation)
 * - 'contour-flow' (Option B): Sweeping S-shaped river valley with rolling ridges
 * - 'alpine-landscape' (Option A): Sharp alpine massifs & arête peaks
 *
 * Theme can be set via:
 * 1. Prop: `<DigitalSculpture theme="contour-flow" />`
 * 2. URL parameter for instant testing: `?theme=contour-flow` or `?theme=alpine`
 *
 * Loads dynamically during idle time to guarantee zero blocking of page text and navigation.
 */
export default function DigitalSculpture({ className = '', theme = 'harmonic-nexus' }) {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | failed
  const [resolvedTheme, setResolvedTheme] = useState('harmonic-nexus');

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

    // Detect theme from URL query param (?theme=flow / ?theme=alpine / ?bg=...) or prop
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const urlTheme = urlParams?.get('theme') || urlParams?.get('bg');
    const activeSettings = getSculptureSettings(urlTheme || theme || 'harmonic-nexus');
    setResolvedTheme(activeSettings.id);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const fail = (error) => {
      if (error) console.warn('[DigitalSculpture] 3D view unavailable:', error.message || error);
      dispose?.();
      dispose = null;
      if (!cancelled) setStatus('failed');
    };

    // Load after the browser is idle so hero content is immediately accessible
    const schedule = (cb) => {
      if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
        return window.requestIdleCallback(cb, { timeout: 160 });
      }
      return setTimeout(cb, 40);
    };
    const cancelSchedule = (id) => {
      if (typeof window !== 'undefined' && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };

    const handle = schedule(async () => {
      try {
        let mountScene;
        if (activeSettings.id === 'harmonic-nexus') {
          mountScene = (await import('./harmonic-nexus/scene')).mountHarmonicNexusScene;
        } else if (activeSettings.id === 'chladni-plate') {
          mountScene = (await import('./chladni/scene')).mountChladniScene;
        } else if (activeSettings.id === 'ink-in-water') {
          mountScene = (await import('./ink/scene')).mountInkScene;
        } else if (activeSettings.id === 'contour-flow') {
          mountScene = (await import('./contour/scene')).mountContourScene;
        } else {
          mountScene = (await import('./scene')).mountSculptureScene;
        }
        if (cancelled) return;

        dispose = mountScene(container, activeSettings, {
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
  }, [theme]);

  return (
    <div
      ref={rootRef}
      className={`${styles.sculptureBackground} digital-sculpture ${className}`}
      data-status={status}
      data-theme={resolvedTheme}
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
