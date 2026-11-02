'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function WorkbenchNavLink() {
  const pathname = usePathname() || '';
  const isDashboard = pathname === '/admin' || pathname === '/admin/';
  const isSitemap = pathname.startsWith('/admin/sitemap');
  const isWorkbench = pathname.startsWith('/admin/workbench');

  return (
    <div className="pvp-nav-top">
      <div className="pvp-nav-brand">
        <span className="pvp-nav-brand__dot" />
        <span className="pvp-nav-brand__label">VONPORAT STUDIO</span>
      </div>

      <Link
        href="/admin"
        className={`pvp-nav-overview-btn ${isDashboard ? 'is-active' : ''}`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
        <span>Dashboard Overview</span>
      </Link>

      <Link
        href="/admin/sitemap"
        className={`pvp-nav-overview-btn ${isSitemap ? 'is-active' : ''}`}
        style={
          isSitemap
            ? {
                background: 'rgba(56, 189, 248, 0.15)',
                borderColor: 'rgba(56, 189, 248, 0.45)',
                color: '#f0f9ff',
              }
            : {}
        }
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
        <span>Visual Sitemap</span>
      </Link>

      <Link
        href="/admin/workbench"
        className={`custom-workbench-nav-btn ${isWorkbench ? 'is-active' : ''}`}
      >
        <svg
          width="15"
          height="15"
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
        <span>Workbench Assistant</span>
      </Link>
    </div>
  );
}

export default WorkbenchNavLink;
