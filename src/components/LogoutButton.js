'use client'

import React from 'react';
import { useAuth } from '@payloadcms/ui';

export function LogoutButton() {
  const { logOut } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      // Manually redirect to the login screen to ensure the UI updates correctly
      window.location.href = '/admin/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div style={{ marginTop: '1.5rem', padding: '0' }}>
      <style>{`
        .custom-logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.6);
          font-family: monospace;
          font-size: 11px;
          font-weight: 500;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .custom-logout-btn:hover {
          background-color: rgba(255, 255, 255, 0.04);
          border-color: rgba(249, 115, 22, 0.3);
          color: #ffffff;
        }
      `}</style>
      <button 
        type="button" 
        onClick={handleLogout} 
        className="custom-logout-btn"
        style={{ width: '100%', textAlign: 'left' }}
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
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
