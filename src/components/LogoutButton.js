'use client';

import React from 'react';
import { useAuth } from '@payloadcms/ui';

export function LogoutButton() {
  const { logOut } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      window.location.href = '/admin/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="pvp-nav-footer">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="pvp-nav-site-btn"
      >
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
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        <span>View Live Site</span>
      </a>

      <button
        type="button"
        onClick={handleLogout}
        className="custom-logout-btn"
      >
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
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  );
}

export default LogoutButton;
