/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useField } from '@payloadcms/ui';

export default function GalleryImagePicker(props) {
  const { path, label = 'Gallery Image' } = props;
  const { value, setValue } = useField({ path });

  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Load images when the component mounts or modal opens
  useEffect(() => {
    let isMounted = true;
    async function fetchImages() {
      if (images.length > 0) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/gallery-images?limit=300&depth=1&sort=order');
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        if (isMounted) {
          setImages(data?.docs || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error('[GalleryImagePicker] Failed to fetch gallery images:', err);
          setError('Could not load gallery images. Please try again.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchImages();
    return () => {
      isMounted = false;
    };
  }, [images.length]);

  // Resolve currently selected image
  const selectedId = useMemo(() => {
    if (!value) return null;
    if (typeof value === 'object') return value.id;
    return value;
  }, [value]);

  const selectedImage = useMemo(() => {
    if (!selectedId) return null;
    return images.find((img) => String(img.id) === String(selectedId)) || null;
  }, [selectedId, images]);

  // Extract unique projects/albums for filter pills
  const filterOptions = useMemo(() => {
    const set = new Set();
    images.forEach((img) => {
      const proj = img.project || (img.album && typeof img.album === 'object' ? img.album.title : null) || (img.category && typeof img.category === 'object' ? img.category.name : null);
      if (proj) set.add(proj);
    });
    return Array.from(set);
  }, [images]);

  // Filtered images in modal
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const title = (img.title || '').toLowerCase();
      const filename = (img.filename || '').toLowerCase();
      const project = (img.project || (img.album?.title) || (img.category?.name) || '').toLowerCase();
      const matchesSearch = !search || title.includes(search.toLowerCase()) || filename.includes(search.toLowerCase()) || project.includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (activeFilter === 'all') return true;

      const imgProj = img.project || (img.album?.title) || (img.category?.name) || '';
      return imgProj.toLowerCase() === activeFilter.toLowerCase();
    });
  }, [images, search, activeFilter]);

  const handleSelect = (img) => {
    setValue(img.id);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setValue(null);
  };

  return (
    <div style={{ marginBottom: '20px', fontFamily: 'inherit' }}>
      <label
        style={{
          display: 'block',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#a1a1aa',
          marginBottom: '8px',
        }}
      >
        {label}
      </label>

      {/* Selected Image Card */}
      {selectedImage ? (
        <div
          style={{
            border: '1px solid rgba(168, 85, 247, 0.35)',
            backgroundColor: '#0c0d12',
            borderRadius: '10px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#18181b',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                flexShrink: 0,
              }}
            >
              <img
                src={selectedImage.thumbUrl || selectedImage.imageUrl}
                alt={selectedImage.title || 'Selected image'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: '3px',
                }}
                title={selectedImage.title}
              >
                {selectedImage.title}
              </div>

              {(selectedImage.project || selectedImage.album?.title) && (
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#c084fc',
                    backgroundColor: 'rgba(168, 85, 247, 0.12)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    marginBottom: '4px',
                  }}
                >
                  {selectedImage.project || selectedImage.album?.title}
                </div>
              )}

              <div
                style={{
                  fontSize: '11px',
                  color: '#71717a',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {selectedImage.filename}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              style={{
                flex: 1,
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 500,
                color: '#e4e4e7',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Change Image
            </button>
            <button
              type="button"
              onClick={handleClear}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 500,
                color: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* Empty State Button */
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            width: '100%',
            padding: '14px',
            border: '1px dashed rgba(255, 255, 255, 0.15)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'border-color 0.15s ease',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(168, 85, 247, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c084fc',
              fontSize: '16px',
            }}
          >
            🖼️
          </div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: '#f4f4f5' }}>
            Choose from Gallery
          </div>
          <div style={{ fontSize: '11px', color: '#71717a' }}>
            Browse {images.length > 0 ? `${images.length} photos with thumbnails` : 'Eddie & gallery images'}
          </div>
        </button>
      )}

      {/* Modal Picker Dialog */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#0c0d12',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '920px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
              overflow: 'hidden',
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
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>
                  Select Gallery Image
                </h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#a1a1aa' }}>
                  Click an image thumbnail to select it for your post.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#a1a1aa',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Controls: Search & Filter Pills */}
            <div
              style={{
                padding: '12px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
              }}
            >
              <input
                type="text"
                placeholder="Search by title, filename or project (e.g. 'Eddie', '1032', 'resin')..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 14px',
                  fontSize: '13px',
                  color: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />

              {/* Filter Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
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
                    backgroundColor: activeFilter === 'all' ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                    color: activeFilter === 'all' ? '#e9d5ff' : '#a1a1aa',
                  }}
                >
                  All ({images.length})
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
                      backgroundColor: activeFilter.toLowerCase() === opt.toLowerCase() ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                      color: activeFilter.toLowerCase() === opt.toLowerCase() ? '#e9d5ff' : '#a1a1aa',
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
              }}
            >
              {loading && images.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#71717a' }}>
                  Loading gallery thumbnails...
                </div>
              ) : error ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
                  {error}
                </div>
              ) : filteredImages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#71717a' }}>
                  No images match your search or filter.
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '12px',
                  }}
                >
                  {filteredImages.map((img) => {
                    const isSelected = String(img.id) === String(selectedId);
                    const src = img.thumbUrl || img.imageUrl;
                    return (
                      <div
                        key={img.id}
                        onClick={() => handleSelect(img)}
                        style={{
                          backgroundColor: '#13141a',
                          border: isSelected ? '2px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.1s ease, border-color 0.1s ease',
                          boxShadow: isSelected ? '0 0 12px rgba(168, 85, 247, 0.4)' : 'none',
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            height: '130px',
                            backgroundColor: '#0a0a0c',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <img
                            src={src}
                            alt={img.title || ''}
                            loading="lazy"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                          {isSelected && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                backgroundColor: '#a855f7',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                fontWeight: 'bold',
                              }}
                            >
                              ✓
                            </div>
                          )}
                        </div>

                        <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <div
                            style={{
                              fontSize: '12px',
                              fontWeight: 600,
                              color: '#ffffff',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            title={img.title}
                          >
                            {img.title}
                          </div>
                          <div
                            style={{
                              fontSize: '10px',
                              color: '#a855f7',
                              fontWeight: 500,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {img.project || img.album?.title || img.filename}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <div style={{ fontSize: '12px', color: '#71717a' }}>
                Showing {filteredImages.length} of {images.length} images
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '7px 16px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
