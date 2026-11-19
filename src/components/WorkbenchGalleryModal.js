/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useMemo } from 'react';

export default function WorkbenchGalleryModal({
  isOpen,
  onClose,
  selectedImages = [],
  onConfirmSelection,
}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Track selected IDs in modal
  const [stagedSelection, setStagedSelection] = useState(selectedImages);

  // Fetch gallery images on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchGallery() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/workbench/gallery');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (isMounted) {
          setImages(data?.images || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error('[WorkbenchGalleryModal] Failed to fetch gallery:', err);
          setError('Could not load gallery photos. Please try again.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGallery();

    return () => {
      isMounted = false;
    };
  }, []);

  // Extract unique album & project filters
  const filterOptions = useMemo(() => {
    const set = new Set();
    images.forEach((img) => {
      if (img.album) set.add(img.album);
    });
    return Array.from(set);
  }, [images]);

  // Filtered list
  const filteredImages = useMemo(() => {
    const q = search.trim().toLowerCase();
    return images.filter((img) => {
      const title = (img.title || '').toLowerCase();
      const filename = (img.filename || '').toLowerCase();
      const album = (img.album || '').toLowerCase();
      const category = (img.category || '').toLowerCase();

      const matchesSearch = !q || title.includes(q) || filename.includes(q) || album.includes(q) || category.includes(q);
      if (!matchesSearch) return false;

      if (activeFilter === 'all') return true;
      return (img.album || '').toLowerCase() === activeFilter.toLowerCase();
    });
  }, [images, search, activeFilter]);

  // Toggle selection of an image
  const handleToggle = (img) => {
    const imgKey = img.id || img.src;
    const exists = stagedSelection.some((item) => (item.id || item.src) === imgKey);

    if (exists) {
      setStagedSelection(stagedSelection.filter((item) => (item.id || item.src) !== imgKey));
    } else {
      setStagedSelection([
        ...stagedSelection,
        {
          id: img.id,
          payloadId: img.payloadId || null,
          title: img.title,
          src: img.src,
          thumb: img.thumb || img.src,
          album: img.album,
          category: img.category,
          source: 'gallery',
        },
      ]);
    }
  };

  const handleConfirm = () => {
    onConfirmSelection(stagedSelection);
    onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#0c0d12',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '960px',
          height: '88vh',
          maxHeight: '820px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
          overflow: 'hidden',
          color: '#f4f4f5',
          fontFamily: 'inherit',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  color: '#c084fc',
                }}
              >
                Gallery Picker
              </span>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 600, color: '#ffffff' }}>
                Select Photo(s) from Existing Gallery
              </h3>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#a1a1aa' }}>
              Choose one or multiple photos to attach to your workbench note. The AI will analyze the sequence, materials, and progress.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#d4d4d8',
              fontSize: '18px',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
              transition: 'all 0.15s ease',
            }}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Controls: Search & Album Filters */}
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by photo title, album (e.g. 'Eddie', 'Darth Vader', 'Butcher', 'Summer')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 34px',
                fontSize: '13px',
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: '11px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#71717a',
                fontSize: '14px',
              }}
            >
              🔍
            </span>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              maxHeight: '76px',
              overflowY: 'auto',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 500,
                borderRadius: '20px',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: activeFilter === 'all' ? '#a855f7' : 'rgba(255, 255, 255, 0.1)',
                backgroundColor: activeFilter === 'all' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                color: activeFilter === 'all' ? '#e9d5ff' : '#a1a1aa',
                transition: 'all 0.15s ease',
              }}
            >
              All Photos ({images.length})
            </button>
            {filterOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setActiveFilter(opt)}
                style={{
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 500,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: activeFilter.toLowerCase() === opt.toLowerCase() ? '#a855f7' : 'rgba(255, 255, 255, 0.1)',
                  backgroundColor: activeFilter.toLowerCase() === opt.toLowerCase() ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                  color: activeFilter.toLowerCase() === opt.toLowerCase() ? '#e9d5ff' : '#a1a1aa',
                  transition: 'all 0.15s ease',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: Thumbnail Grid */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            background: '#090a0e',
          }}
        >
          {loading && images.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#71717a' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
              Loading gallery photos...
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#ef4444' }}>
              {error}
            </div>
          ) : filteredImages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#71717a' }}>
              No images found matching your search.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                gap: '12px',
              }}
            >
              {filteredImages.map((img) => {
                const imgKey = img.id || img.src;
                const isSelected = stagedSelection.some((item) => (item.id || item.src) === imgKey);

                return (
                  <div
                    key={imgKey}
                    onClick={() => handleToggle(img)}
                    style={{
                      position: 'relative',
                      border: isSelected
                        ? '2px solid #a855f7'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      backgroundColor: isSelected ? 'rgba(168, 85, 247, 0.1)' : '#111218',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: isSelected
                        ? '0 0 15px rgba(168, 85, 247, 0.35)'
                        : '0 4px 10px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {/* Checkbox indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        zIndex: 2,
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        backgroundColor: isSelected ? '#a855f7' : 'rgba(0, 0, 0, 0.65)',
                        border: isSelected ? '1px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isSelected ? '✓' : ''}
                    </div>

                    {/* Image Preview Container */}
                    <div
                      style={{
                        width: '100%',
                        paddingTop: '68%',
                        position: 'relative',
                        backgroundColor: '#18181b',
                      }}
                    >
                      <img
                        src={img.thumb || img.src}
                        alt={img.title || 'Gallery thumbnail'}
                        loading="lazy"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: isSelected ? 1 : 0.88,
                          transition: 'opacity 0.15s ease',
                        }}
                      />
                    </div>

                    {/* Meta info */}
                    <div style={{ padding: '8px 10px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: isSelected ? '#ffffff' : '#d4d4d8',
                          lineHeight: 1.3,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          marginBottom: '4px',
                        }}
                        title={img.title}
                      >
                        {img.title}
                      </div>

                      {img.album && (
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#a1a1aa',
                            fontFamily: 'monospace',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          📁 {img.album}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer / Action Bar */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div style={{ fontSize: '13px', color: '#a1a1aa' }}>
            <strong style={{ color: '#ffffff' }}>{stagedSelection.length}</strong> photo{stagedSelection.length === 1 ? '' : 's'} selected
            {stagedSelection.length > 0 && (
              <button
                type="button"
                onClick={() => setStagedSelection([])}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#f87171',
                  fontSize: '12px',
                  cursor: 'pointer',
                  marginLeft: '12px',
                  textDecoration: 'underline',
                }}
              >
                Clear all
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#d4d4d8',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              style={{
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#ffffff',
                backgroundColor: '#9333ea',
                border: '1px solid #a855f7',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(168, 85, 247, 0.4)',
              }}
            >
              Confirm Selection ({stagedSelection.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
