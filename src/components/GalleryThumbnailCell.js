/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react'

export default function GalleryThumbnailCell({ cellData, rowData }) {
  const [isHovered, setIsHovered] = useState(false);
  const src = cellData || rowData?.thumbUrl || rowData?.imageUrl || (rowData?.image?.url) || rowData?.coverUrl || (rowData?.coverImage?.url);

  if (!src) {
    return (
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '9px',
          color: '#71717a',
          fontFamily: 'monospace',
        }}
      >
        —
      </div>
    );
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: '#0a0a0c',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.4)',
        }}
      >
        <img
          src={src}
          alt={rowData?.title || 'Thumbnail'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          loading="lazy"
        />
      </div>

      {/* Hover preview zoom popup */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            left: '52px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 9999,
            backgroundColor: '#0c0d12',
            padding: '6px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.8), 0 0 15px rgba(224, 98, 181, 0.25)',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            width: '200px',
          }}
        >
          <img
            src={rowData?.imageUrl || src}
            alt={rowData?.title || 'Preview'}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '180px',
              objectFit: 'contain',
              borderRadius: '6px',
              backgroundColor: '#000',
              display: 'block',
            }}
          />
          <div style={{ fontSize: '11px', color: '#e4e4e7', fontFamily: 'monospace', lineHeight: '1.2', padding: '0 2px' }}>
            <div style={{ fontWeight: 600, color: '#fff', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {rowData?.title || rowData?.filename}
            </div>
            <div style={{ fontSize: '10px', color: '#a1a1aa' }}>
              {rowData?.width && rowData?.height ? `${rowData.width}×${rowData.height} • ` : ''}{rowData?.orientation || ''}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
