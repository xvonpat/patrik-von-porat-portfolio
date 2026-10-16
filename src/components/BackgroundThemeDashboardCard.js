'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './BackgroundThemeDashboardCard.module.css';

const THEMES = [
  {
    id: 'digital-eclipse-v2',
    title: 'Digital Eclipse II',
    subtitle: 'Option D — Atmospheric Corona',
    badge: 'New Version',
    description:
      'A delicate, uneven corona around a dark circular void, with concentrated cyan highlights, vivid pink light scattering, fine clustered filaments, and quiet gaps.',
    features: ['Thin irregular corona', 'Local cyan and pink glow', 'Gentle light pulses', 'Damped pointer response'],
    previewQuery: 'eclipse-v2',
  },
  {
    id: 'digital-eclipse',
    title: 'Digital Eclipse',
    subtitle: 'Option C — Cosmic Corona & Filaments',
    badge: 'Digital Eclipse',
    description:
      'A large circular eclipse with an absolute black central void, surrounded by electric cyan highlights, near-white hot cores, vivid pink/magenta arcs, fine radial filaments, and shimmering cosmic dust.',
    features: ['Electric cyan clusters', 'Vivid pink/magenta arcs', 'Pure black void center', 'Interactive pointer deflection'],
    previewQuery: 'eclipse',
  },
  {
    id: 'contour-flow',
    title: 'Contour Flow',
    subtitle: 'Option B — Rolling S-Valley Landscape',
    badge: 'S-Valley River',
    description:
      'A dark, flowing digital landscape featuring a luminous S-shaped cyan river valley, broad rolling ridges with nested elevation loops, restrained magenta accents, and a calm reading zone behind the introductory text.',
    features: ['S-shaped river canyon', 'Rolling massifs & nested loops', 'Calm text zone', 'Sparse magenta trails'],
    previewQuery: 'flow',
  },
  {
    id: 'alpine-landscape',
    title: 'Topographic Landscape',
    subtitle: 'Option A — Dramatic Mountain Range',
    badge: 'Alpine Peaks',
    description:
      'A dramatic mountain range inspired by topographic survey maps, featuring sharp peaks, connected arête ridgelines, asymmetrical slopes, and a winding magenta path cutting across the valleys.',
    features: ['Sharp alpine summits', 'Asymmetrical ridges', 'Deep ravines', 'Winding magenta trail'],
    previewQuery: 'alpine',
  },
];

export function BackgroundThemeDashboardCard() {
  const [activeTheme, setActiveTheme] = useState('digital-eclipse');
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
                className={`${styles.themeOption} ${isActive ? styles.themeOptionActive : ''}`}
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
