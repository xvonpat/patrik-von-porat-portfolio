'use client';

import React from 'react';
import Link from 'next/link';

export function WorkbenchNavLink() {
  return (
    <div style={{ marginTop: '0.75rem', padding: '0' }}>
      <style>{`
        .custom-workbench-nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          background: rgba(168, 85, 247, 0.08);
          border: 1px solid rgba(168, 85, 247, 0.28);
          border-radius: 4px;
          color: #e9d5ff;
          font-family: monospace;
          font-size: 11px;
          font-weight: 500;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .custom-workbench-nav-btn:hover {
          background-color: rgba(168, 85, 247, 0.18);
          border-color: rgba(168, 85, 247, 0.5);
          color: #ffffff;
        }
      `}</style>
      <Link href="/admin/workbench" className="custom-workbench-nav-btn">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        Workbench Assistant
      </Link>
    </div>
  );
}

export default WorkbenchNavLink;
