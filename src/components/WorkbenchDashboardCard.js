'use client';

import React from 'react';
import Link from 'next/link';

export function WorkbenchDashboardCard() {
  return (
    <div style={{
      boxSizing: 'border-box',
      width: '100%',
      marginBottom: 'var(--base, 1.5rem)',
      fontFamily: 'inherit',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(24, 24, 27, 0.95) 0%, rgba(15, 10, 25, 0.95) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        borderRadius: 'var(--style-radius-m, 8px)',
        padding: 'calc(var(--base, 1rem) * 1.35)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            color: '#c084fc',
            flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>
                Workbench Assistant
              </h3>
              <span style={{
                fontSize: '11px',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                padding: '2px 6px',
                borderRadius: '3px',
                background: 'rgba(168, 85, 247, 0.2)',
                color: '#d8b4fe',
                border: '1px solid rgba(168, 85, 247, 0.3)',
              }}>
                Private
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#a1a1aa', lineHeight: 1.45 }}>
              Upload workbench photos, write quick observations, and generate story angles and drafts.
            </p>
          </div>
        </div>

        <Link
          href="/admin/workbench"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: '13px',
            fontWeight: 600,
            padding: '0.65rem 1.15rem',
            borderRadius: '6px',
            background: '#a855f7',
            color: '#ffffff',
            textDecoration: 'none',
            transition: 'background 0.15s ease',
          }}
        >
          Open Workbench →
        </Link>
      </div>
    </div>
  );
}

export default WorkbenchDashboardCard;
