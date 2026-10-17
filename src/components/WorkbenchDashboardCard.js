'use client';

import React from 'react';
import Link from 'next/link';

export function WorkbenchDashboardCard() {
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
            'linear-gradient(135deg, rgba(22, 18, 32, 0.96) 0%, rgba(13, 12, 18, 0.98) 65%, rgba(16, 24, 28, 0.95) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.28)',
          borderRadius: '10px',
          padding: '1.15rem 1.35rem',
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.4)',
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
              background: 'rgba(168, 85, 247, 0.16)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              color: '#c084fc',
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.01em' }}>
                Workbench Assistant
              </h2>
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  background: 'rgba(168, 85, 247, 0.18)',
                  color: '#d8b4fe',
                  border: '1px solid rgba(168, 85, 247, 0.32)',
                }}
              >
                Editorial AI
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#a1a1aa', lineHeight: 1.4 }}>
              Upload workbench photos, capture studio notes, and generate journal drafts or story angles.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem' }}>
          <Link
            href="/admin/collections/posts/create"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.78rem',
              fontWeight: 500,
              padding: '0.52rem 0.85rem',
              borderRadius: '7px',
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.28)',
              color: '#e9d5ff',
              textDecoration: 'none',
            }}
          >
            <span>+ New Post</span>
          </Link>

          <Link
            href="/admin/collections/gallery-images/create"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.78rem',
              fontWeight: 500,
              padding: '0.52rem 0.85rem',
              borderRadius: '7px',
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.28)',
              color: '#bae6fd',
              textDecoration: 'none',
            }}
          >
            <span>+ Gallery Image</span>
          </Link>

          <Link
            href="/admin/workbench"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '0.55rem 1.05rem',
              borderRadius: '7px',
              background: '#9333ea',
              border: '1px solid rgba(192, 132, 252, 0.45)',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(147, 51, 234, 0.35)',
            }}
          >
            <span>Open Workbench →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WorkbenchDashboardCard;
