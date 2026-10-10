/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useFormFields } from '@payloadcms/ui'

export default function GalleryThumbnailField() {
  const thumbUrl = useFormFields(([fields]) => fields?.thumbUrl?.value);
  const imageUrl = useFormFields(([fields]) => fields?.imageUrl?.value);
  const title = useFormFields(([fields]) => fields?.title?.value);
  const orientation = useFormFields(([fields]) => fields?.orientation?.value);
  const width = useFormFields(([fields]) => fields?.width?.value);
  const height = useFormFields(([fields]) => fields?.height?.value);

  const previewSrc = thumbUrl || imageUrl;

  if (!previewSrc) {
    return (
      <div
        style={{
          marginBottom: '16px',
          padding: '16px',
          borderRadius: '8px',
          border: '1px dashed rgba(255, 255, 255, 0.15)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          textAlign: 'center',
          color: '#71717a',
          fontSize: '12px',
          fontFamily: 'monospace',
        }}
      >
        No image preview available yet
      </div>
    );
  }

  return (
    <div
      style={{
        marginBottom: '16px',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backgroundColor: '#0c0d12',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#e062b5',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>Preview</span>
        <span style={{ fontSize: '10px', color: '#71717a' }}>{orientation || 'image'}</span>
      </div>

      <div
        style={{
          width: '100%',
          maxHeight: '260px',
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <img
          src={previewSrc}
          alt={title || 'Preview'}
          style={{
            maxWidth: '100%',
            maxHeight: '260px',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      <div
        style={{
          fontSize: '11px',
          color: '#a1a1aa',
          fontFamily: 'monospace',
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '2px',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title || 'Photograph'}
        </span>
        {width && height && <span style={{ flexShrink: 0, marginLeft: '8px' }}>{width} × {height}</span>}
      </div>
    </div>
  );
}
