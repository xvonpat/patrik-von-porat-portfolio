'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './BackgroundThemeDashboardCard.module.css';

const THEMES = [
  {
    id: 'harmonic-nexus',
    title: 'Harmonic Nexus — 3D Cymatic Strings & Attractor',
    subtitle: 'Option E — Signature Identity Sculpture (Music · Visual Art · Systems)',
    badge: 'Signature 3D',
    featured: true,
    description:
      'Real-time 3D WebGL sculpture uniting guitar string standing-wave harmonics, stippled cymatic particle streams, and a four-phase systems attractor in Electric Cyan, Obsidian Violet, and Vivid Rose. Move your pointer to pluck strings or click-and-drag to orbit.',
    features: [
      '3D resonant guitar strings',
      'Interactive pointer plucking',
      'Cymatic particle attractor',
      'Cyan · Violet · Magenta spectrum',
    ],
    previewQuery: 'harmonic-nexus',
  },
  {
    id: 'digital-eclipse-v2',
    title: 'Digital Eclipse II',
    subtitle: 'Option D — Particle Data Ring',
    badge: 'Data Ring',
    description:
      'Animated particle-based data ring around a dark void, with travelling cyan & pink activation pulses, outward dot flow, and gentle breathing.',
    features: ['Curved dot streams', 'Travelling pulses', 'Outward data flow'],
    previewQuery: 'eclipse-v2',
  },
  {
    id: 'digital-eclipse',
    title: 'Digital Eclipse',
    subtitle: 'Option C — WebGL Corona',
    badge: '3D Eclipse',
    description:
      'Three.js circular eclipse with electric cyan highlights, vivid pink/magenta arcs, outward particle streams, and pointer deflection.',
    features: ['Electric cyan flares', 'Vivid pink arcs', '3D pointer parallax'],
    previewQuery: 'eclipse',
  },
  {
    id: 'contour-flow',
    title: 'Contour Flow',
    subtitle: 'Option B — S-Valley Landscape',
    badge: 'S-Valley',
    description:
      'Flowing 3D topographic terrain featuring a sweeping S-shaped cyan river valley, rolling ridges, and sparse magenta contour accents.',
    features: ['S-shaped canyon', 'Rolling massifs', 'Magenta routes'],
    previewQuery: 'flow',
  },
  {
    id: 'alpine-landscape',
    title: 'Topographic Peaks',
    subtitle: 'Option A — Alpine Massifs',
    badge: 'Alpine',
    description:
      'High-relief mountain range with sharp arête ridgelines, asymmetrical slopes, deep cirque bowls, and a winding magenta trail.',
    features: ['Sharp alpine summits', 'Arête ridgelines', 'Deep ravines'],
    previewQuery: 'alpine',
  },
];

export function BackgroundThemeDashboardCard() {
  const [activeTheme, setActiveTheme] = useState('harmonic-nexus');
  const [loading, setLoading] = useState(true);
  const [savingTheme, setSavingTheme] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadCurrentSetting() {
      try {
        const res = await fetch('/api/globals/site-settings', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data?.homepageBackground) {
            setActiveTheme(data.homepageBackground);
          }
        }
      } catch (err) {
        console.warn('[BackgroundThemeDashboardCard] Failed to fetch current theme:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCurrentSetting();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelectTheme = async (themeId) => {
    if (savingTheme || activeTheme === themeId) return;

    setSavingTheme(themeId);
    setStatusMessage('');

    try {
      const res = await fetch('/api/globals/site-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          homepageBackground: themeId,
        }),
      });

      if (res.ok) {
        setActiveTheme(themeId);
        const name = THEMES.find((t) => t.id === themeId)?.title || themeId;
        setStatusMessage(`✓ "${name}" is now active on the homepage!`);
        setTimeout(() => setStatusMessage(''), 5000);
      } else {
        // Payload may return an empty error body. Keep the useful HTTP status
        // without logging server response bodies that could contain DB details.
        console.error(`Failed to update background theme (HTTP ${res.status}).`);
        setStatusMessage(
          res.status === 401 || res.status === 403
            ? '✕ Your session may have expired. Sign in again and retry.'
            : `✕ Failed to update theme (HTTP ${res.status}). Please try again or open Site Settings.`
        );
      }
    } catch (err) {
      console.error('Error updating background theme:', err);
      setStatusMessage('✕ Network error while updating theme.');
    } finally {
      setSavingTheme(null);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.titleRow}>
              <span className={styles.iconBadge} aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </span>
              <h2 className={styles.title}>Homepage Background Theme</h2>
            </div>
            <p className={styles.subtitle}>
              Switch between interactive 3D digital landscape themes directly from your dashboard.
            </p>
          </div>

          <div className={styles.headerActions}>
            <a href="/" target="_blank" rel="noopener noreferrer" className={styles.linkPill}>
              <span>View Site</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <Link href="/admin/globals/site-settings" className={styles.linkPill}>
              <span>Site Settings Global</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          {THEMES.map((theme) => {
            const isActive = activeTheme === theme.id;
            const isSaving = savingTheme === theme.id;

            return (
              <div
                key={theme.id}
                className={`${styles.themeOption} ${theme.featured ? styles.themeOptionFeatured : ''} ${isActive ? styles.themeOptionActive : ''}`}
                onClick={() => !isActive && handleSelectTheme(theme.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!isActive) handleSelectTheme(theme.id);
                  }
                }}
              >
                <div>
                  <div className={styles.optionHeader}>
                    <div>
                      <h3 className={styles.optionName}>{theme.title}</h3>
                      <span className={styles.subtitle}>{theme.subtitle}</span>
                    </div>
                    <span className={`${styles.optionBadge} ${isActive ? styles.activeBadge : ''}`}>
                      {theme.badge}
                    </span>
                  </div>

                  <p className={styles.optionDesc}>{theme.description}</p>

                  <ul className={styles.featuresList}>
                    {theme.features.map((feat) => (
                      <li key={feat} className={styles.featureTag}>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.cardFooter}>
                  {isActive ? (
                    <div className={styles.activeIndicator}>
                      <span className={styles.activeDot} />
                      <span>Active on Homepage</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={styles.activateButton}
                      disabled={loading || savingTheme !== null}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTheme(theme.id);
                      }}
                    >
                      {isSaving ? 'Activating…' : 'Activate Theme'}
                    </button>
                  )}

                  <a
                    href={`/?theme=${theme.previewQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.previewLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Preview in new tab ↗
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {statusMessage && (
          <div className={styles.statusMessage} role="status">
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default BackgroundThemeDashboardCard;
