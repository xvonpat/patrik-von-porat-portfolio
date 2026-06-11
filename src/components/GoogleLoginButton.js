import React from 'react';

export function GoogleLoginButton() {
  return (
    <div style={{ marginBottom: '1.5rem', width: '100%' }}>
      <style>{`
        .google-login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 12px 16px;
          background-color: #0a0a0c;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: #e4e4e7;
          font-family: monospace;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
        .google-login-btn:hover {
          background-color: #121215;
          border-color: rgba(249, 115, 22, 0.3);
          color: #ffffff;
        }
      `}</style>
      <a
        href="/api/oauth/google"
        className="google-login-btn"
      >
        {/* Google G logo svg */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
        Sign in with Google
      </a>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '1.5rem',
          marginBottom: '1rem',
          color: 'rgba(255, 255, 255, 0.2)',
          fontSize: '10px',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        <div style={{ flexGrow: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
        or password login
        <div style={{ flexGrow: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
      </div>
    </div>
  );
}
export default GoogleLoginButton;
