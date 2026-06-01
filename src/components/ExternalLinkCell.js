'use client'
import React from 'react'

export default function ExternalLinkCell({ cellData }) {
  if (!cellData) return null;
  return (
    <a
      href={cellData}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        color: 'var(--theme-text)',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'opacity 0.2s',
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
    >
      <span style={{ textDecoration: 'underline' }}>{cellData}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </a>
  )
}
