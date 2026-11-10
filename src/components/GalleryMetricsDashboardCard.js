import React from 'react';
import Link from 'next/link';
import manifest from '../data/gallery-file-manifest.json';

export function GalleryMetricsDashboardCard() {
  const files = manifest.files || {};
  const galleryPaths = Object.keys(files).filter(
    (p) => p.startsWith('/images/gallery/') || p.startsWith('/images/art/') || p.startsWith('/images/projects/3d-house/'),
  );
  const totalMB = galleryPaths.reduce((sum, p) => sum + files[p], 0) / (1024 * 1024);

  return (
    <div style={{ boxSizing: 'border-box', width: '100%', marginBottom: '1.25rem', fontFamily: 'inherit' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(14, 20, 28, 0.96) 0%, rgba(10, 14, 20, 0.98) 65%, rgba(18, 14, 26, 0.95) 100%)',
          border: '1px solid rgba(167, 139, 250, 0.28)',
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
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#ffffff' }}>Gallery Storage Metrics</h2>
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '2px 7px',
                borderRadius: '4px',
                background: 'rgba(167, 139, 250, 0.18)',
                color: '#c4b5fd',
                border: '1px solid rgba(167, 139, 250, 0.32)',
              }}
            >
              {galleryPaths.length} files · {totalMB.toFixed(1)} MB on disk
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '12.5px', color: '#94a3b8', lineHeight: 1.4, maxWidth: '640px' }}>
            Per-image filenames, rename history and file sizes for full-size images and thumbnails, with CSV export for analysis.
          </p>
        </div>
        <Link
          href="/admin/gallery-metrics"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.55rem 1rem',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.22) 0%, rgba(103, 232, 249, 0.12) 100%)',
            border: '1px solid rgba(167, 139, 250, 0.45)',
            color: '#ede9fe',
          }}
        >
          Open Metrics →
        </Link>
      </div>
    </div>
  );
}

export default GalleryMetricsDashboardCard;
