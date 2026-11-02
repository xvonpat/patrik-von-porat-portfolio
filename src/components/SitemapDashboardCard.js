'use client';

import React from 'react';
import Link from 'next/link';

export function SitemapDashboardCard() {
  const routes = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'DMAIC Case Study', path: '/projects/dmaic-companion' },
    { label: 'Music', path: '/music' },
    { label: 'Art', path: '/art' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Journal', path: '/blog' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        marginBottom: '1.25rem',
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(14, 20, 28, 0.96) 0%, rgba(10, 14, 20, 0.98) 65%, rgba(18, 14, 26, 0.95) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.28)',
          borderRadius: '10px',
          padding: '1.15rem 1.35rem',
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.95rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '9px',
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                color: '#38bdf8',
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  Site Architecture & Visual Map
                </h2>
                <span
                  style={{
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    background: 'rgba(56, 189, 248, 0.18)',
                    color: '#7dd3fc',
                    border: '1px solid rgba(56, 189, 248, 0.32)',
                  }}
                >
                  10 Routes · 8 CMS Connections
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', color: '#94a3b8', lineHeight: 1.4, maxWidth: '640px' }}>
                Visual map of vonporat.com. Explore public routes, case studies, sections, and how Payload CMS collections power frontend content.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Link
              href="/admin/sitemap"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 1rem',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.16) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.45)',
                color: '#e0f2fe',
                boxShadow: '0 2px 10px rgba(56, 189, 248, 0.15)',
                transition: 'all 0.15s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="6" y1="3" x2="6" y2="15" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M18 9a9 9 0 0 1-9 9" />
              </svg>
              Open Visual Map →
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 0.85rem',
                borderRadius: '6px',
                fontSize: '12.5px',
                fontWeight: 500,
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#d4d4d8',
                transition: 'all 0.15s ease',
              }}
            >
              Live Site ↗
            </a>
          </div>
        </div>

        {/* Quick Route Cloud */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.4rem',
            paddingTop: '0.55rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'monospace',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginRight: '0.3rem',
            }}
          >
            Quick Jumps:
          </span>
          {routes.map((r, i) => (
            <a
              key={i}
              href={r.path}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'monospace',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{r.label}</span>
              <span style={{ color: '#38bdf8', opacity: 0.7 }}>{r.path}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SitemapDashboardCard;
