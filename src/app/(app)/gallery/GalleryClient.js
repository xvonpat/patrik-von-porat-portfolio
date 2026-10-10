"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { galleryPhotos as fallbackPhotos, eddieTheTrooperPhotos, galleryAlbums as fallbackAlbums } from './galleryData';

export default function GalleryClient({ initialCategories = [], initialAlbums = [], initialImages = [] }) {
  // Ensure default categories, albums and images fallback if not provided
  const categories = useMemo(() => {
    if (initialCategories.length > 0) return initialCategories;
    return [
      {
        id: 'summer-2026',
        name: 'Summer 2026',
        slug: 'summer-2026',
        eyebrow: 'Adobe Lightroom Collection',
        description: 'Curated Web Album • 35mm & Digital',
        order: 1,
      },
      {
        id: '3d-prints',
        name: '3D Prints',
        slug: '3d-prints',
        eyebrow: 'Physical Models',
        description: 'Resin printing, assembly, and hand-painted miniatures',
        order: 2,
      },
    ];
  }, [initialCategories]);

  const albums = useMemo(() => {
    if (initialAlbums.length > 0) return initialAlbums;
    return fallbackAlbums;
  }, [initialAlbums]);

  const allPhotos = useMemo(() => {
    if (initialImages.length > 0) return initialImages;
    return [
      ...fallbackPhotos.map((photo, index) => ({
        ...photo,
        categorySlug: 'summer-2026',
        albumSlug: null,
        order: index + 1,
      })),
      ...eddieTheTrooperPhotos,
    ];
  }, [initialImages]);

  // Selected category: default to 'summer-2026' for initial release, or first category, or 'all-collections'
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category') || params.get('collection');
      if (catParam === 'all' || catParam === 'all-collections') return 'all-collections';
      if (catParam && categories.some(c => c.slug === catParam)) return catParam;
    }
    const hasSummer = categories.some(c => c.slug === 'summer-2026');
    if (hasSummer) return 'summer-2026';
    return categories[0]?.slug || 'all-collections';
  });

  // Selected album within the active category: 'all-images' by default
  const [selectedAlbum, setSelectedAlbum] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const albParam = params.get('album') || params.get('project');
      if (albParam) return albParam;
    }
    return 'all-images';
  });

  const [filter, setFilter] = useState('all'); // 'all' | 'landscape' | 'portrait'
  const [gridCols, setGridCols] = useState(3); // 2 | 3 | 4
  const [activeLoupeIndex, setActiveLoupeIndex] = useState(null); // null when closed, 0..N when open
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showFilmstrip, setShowFilmstrip] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Derived counts per category
  const categoryCounts = useMemo(() => {
    const counts = {};
    for (const photo of allPhotos) {
      if (photo.categorySlug) {
        counts[photo.categorySlug] = (counts[photo.categorySlug] || 0) + 1;
      }
    }
    return counts;
  }, [allPhotos]);

  // Hide empty categories from the public selector
  const visibleCategories = useMemo(() => {
    return categories.filter(cat => (categoryCounts[cat.slug] || 0) > 0);
  }, [categories, categoryCounts]);

  // Check URL query parameters on mount for direct deep-linking
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);

    const catParam = params.get('category') || params.get('collection');
    let activeCat = selectedCategory;
    if (catParam) {
      if (catParam === 'all' || catParam === 'all-collections') {
        requestAnimationFrame(() => {
          setSelectedCategory('all-collections');
          setSelectedAlbum('all-images');
        });
        activeCat = 'all-collections';
      } else if (categories.some(c => c.slug === catParam)) {
        requestAnimationFrame(() => {
          setSelectedCategory(catParam);
        });
        activeCat = catParam;
      }
    }

    const albumParam = params.get('album') || params.get('project');
    let activeAlb = 'all-images';
    if (albumParam) {
      requestAnimationFrame(() => {
        setSelectedAlbum(albumParam);
      });
      activeAlb = albumParam;
    }

    const photoParam = params.get('photo') || params.get('loupe');
    if (photoParam !== null) {
      let targetPool = activeCat === 'all-collections'
        ? allPhotos
        : allPhotos.filter(p => p.categorySlug === activeCat);

      if (activeAlb !== 'all-images') {
        targetPool = targetPool.filter(p => p.albumSlug === activeAlb);
      }

      let targetIdx = -1;
      if (!isNaN(Number(photoParam))) {
        const idx = parseInt(photoParam, 10);
        if (idx >= 0 && idx < targetPool.length) {
          targetIdx = idx;
        }
      } else {
        const foundIdx = targetPool.findIndex(p => p.id === photoParam || p.filename === photoParam || p.filename === `${photoParam}.jpg`);
        if (foundIdx !== -1) {
          targetIdx = foundIdx;
        }
      }
      if (targetIdx !== -1) {
        requestAnimationFrame(() => {
          setActiveLoupeIndex(targetIdx);
        });
      }
    }
  }, [allPhotos, categories, selectedCategory]);

  const filmstripRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const slideIntervalRef = useRef(null);

  // Photos filtered by the active category
  const categoryPhotos = useMemo(() => {
    if (selectedCategory === 'all-collections') {
      return allPhotos;
    }
    return allPhotos.filter(photo => photo.categorySlug === selectedCategory);
  }, [allPhotos, selectedCategory]);

  // Albums belonging to the currently active collection
  const currentCategoryAlbums = useMemo(() => {
    if (selectedCategory === 'all-collections') {
      return [];
    }
    return albums.filter(alb => alb.collectionSlug === selectedCategory);
  }, [albums, selectedCategory]);

  // Derived counts per album within this collection
  const albumCounts = useMemo(() => {
    const counts = {};
    for (const photo of categoryPhotos) {
      if (photo.albumSlug) {
        counts[photo.albumSlug] = (counts[photo.albumSlug] || 0) + 1;
      }
    }
    return counts;
  }, [categoryPhotos]);

  // Hide empty albums from the public selector
  const visibleAlbums = useMemo(() => {
    return currentCategoryAlbums.filter(alb => (albumCounts[alb.slug] || 0) > 0);
  }, [currentCategoryAlbums, albumCounts]);

  // Photos filtered by both category and album
  const albumPhotos = useMemo(() => {
    if (selectedAlbum === 'all-images' || !selectedAlbum) {
      return categoryPhotos;
    }
    return categoryPhotos.filter(photo => photo.albumSlug === selectedAlbum);
  }, [categoryPhotos, selectedAlbum]);

  // Derived orientation counts for the active collection and album
  const orientationCounts = useMemo(() => {
    const all = albumPhotos.length;
    const landscape = albumPhotos.filter(p => p.orientation === 'landscape').length;
    const portrait = albumPhotos.filter(p => p.orientation === 'portrait').length;
    return { all, landscape, portrait };
  }, [albumPhotos]);

  // Filtered photos based on orientation
  const filteredPhotos = useMemo(() => {
    if (filter === 'landscape') return albumPhotos.filter(photo => photo.orientation === 'landscape');
    if (filter === 'portrait') return albumPhotos.filter(photo => photo.orientation === 'portrait');
    return albumPhotos;
  }, [albumPhotos, filter]);

  // Active collection metadata with dynamic "Images" count
  const collectionMeta = useMemo(() => {
    const count = categoryPhotos.length;
    const countStr = `${count} ${count === 1 ? 'Image' : 'Images'}`;

    if (selectedCategory === 'all-collections') {
      return {
        eyebrow: 'All Collections',
        title: 'Gallery',
        description: `${allPhotos.length} ${allPhotos.length === 1 ? 'Image' : 'Images'} • All collections`,
      };
    }

    const currentCat = categories.find(c => c.slug === selectedCategory);

    if (selectedCategory === 'summer-2026') {
      return {
        eyebrow: currentCat?.eyebrow || 'Adobe Lightroom Collection',
        title: currentCat?.name || 'Summer 2026',
        description: `${categoryPhotos.length} Photographs • Curated Web Album • 35mm & Digital`,
      };
    }

    // When an album is actively selected, show album context in the description while retaining main collection title
    if (selectedAlbum && selectedAlbum !== 'all-images') {
      const activeAlb = visibleAlbums.find(a => a.slug === selectedAlbum);
      const albCount = albumPhotos.length;
      const albCountStr = `${albCount} ${albCount === 1 ? 'Image' : 'Images'}`;
      if (activeAlb?.description) {
        return {
          eyebrow: currentCat?.eyebrow || 'Curated Collection',
          title: currentCat?.name || 'Collection',
          description: `${albCountStr} • ${activeAlb.description}`,
        };
      }
    }

    return {
      eyebrow: currentCat?.eyebrow || 'Curated Collection',
      title: currentCat?.name || 'Collection',
      description: currentCat?.description
        ? `${countStr} • ${currentCat.description}`
        : `${countStr} • Curated Collection`,
    };
  }, [selectedCategory, selectedAlbum, categories, visibleAlbums, categoryPhotos.length, albumPhotos.length, allPhotos.length]);

  // Switch category safely without stale indices, resetting album to 'all-images'
  const handleCategoryChange = useCallback((catSlug) => {
    if (catSlug === selectedCategory) return;
    setSelectedCategory(catSlug);
    setSelectedAlbum('all-images');
    setActiveLoupeIndex(null);
    setIsPlaying(false);
    setIsZoomed(false);
  }, [selectedCategory]);

  // Switch album safely without stale indices
  const handleAlbumChange = useCallback((albumSlug) => {
    if (albumSlug === selectedAlbum) return;
    setSelectedAlbum(albumSlug);
    setActiveLoupeIndex(null);
    setIsPlaying(false);
    setIsZoomed(false);
  }, [selectedAlbum]);

  // Switch orientation filter safely without stale indices
  const handleFilterChange = useCallback((newFilter) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    setActiveLoupeIndex(null);
    setIsPlaying(false);
    setIsZoomed(false);
  }, [filter]);

  const isLoupeOpen = activeLoupeIndex !== null && activeLoupeIndex >= 0 && activeLoupeIndex < filteredPhotos.length;
  const currentPhoto = isLoupeOpen ? filteredPhotos[activeLoupeIndex] : null;

  // Handle Next / Prev in Loupe
  const handleNext = useCallback(() => {
    if (!filteredPhotos.length) return;
    setIsImageLoaded(false);
    setIsZoomed(false);
    setActiveLoupeIndex(prev => ((prev ?? 0) + 1) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (!filteredPhotos.length) return;
    setIsImageLoaded(false);
    setIsZoomed(false);
    setActiveLoupeIndex(prev => ((prev ?? 0) - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const handleClose = useCallback(() => {
    setActiveLoupeIndex(null);
    setIsPlaying(false);
    setIsZoomed(false);
  }, []);

  // Slideshow auto-advance
  useEffect(() => {
    if (isPlaying && isLoupeOpen) {
      slideIntervalRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    } else {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    }
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [isPlaying, isLoupeOpen, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isLoupeOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
      if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed(prev => !prev);
      }
      if (e.key === 't' || e.key === 'T') {
        setShowFilmstrip(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isLoupeOpen, handleClose, handleNext, handlePrev]);

  // Auto-scroll filmstrip to keep active item in view
  useEffect(() => {
    if (isLoupeOpen && filmstripRef.current && showFilmstrip) {
      const activeThumb = filmstripRef.current.querySelector(`[data-index="${activeLoupeIndex}"]`);
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeLoupeIndex, isLoupeOpen, showFilmstrip]);

  // Touch swipe support for mobile loupe
  const handleTouchStart = (e) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="w-full min-h-screen relative pb-20 pt-6">
      
      {/* 1. Lightroom Studio Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 border-b border-white/[0.08] pb-6 flex flex-col gap-6">
        
        {/* Compact Category Selector above collection heading */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex-shrink-0">
            Collection:
          </span>
          <div 
            role="tablist" 
            aria-label="Filter gallery by collection"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"
          >
            {/* All collections Pill */}
            <button
              role="tab"
              aria-selected={selectedCategory === 'all-collections'}
              onClick={() => handleCategoryChange('all-collections')}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                selectedCategory === 'all-collections'
                  ? 'bg-accent-purple/15 text-accent-purple border border-accent-purple/40 shadow-[0_0_12px_rgba(224,98,181,0.2)] font-semibold'
                  : 'bg-obsidian-950/80 text-zinc-400 hover:text-zinc-200 border border-white/[0.08] hover:border-white/20'
              }`}
            >
              <span>All collections</span>
              <span className={`text-[10px] font-mono ${selectedCategory === 'all-collections' ? 'text-accent-purple/80' : 'text-zinc-500'}`}>
                ({allPhotos.length})
              </span>
            </button>

            {/* Non-empty Category Pills */}
            {visibleCategories.map(cat => {
              const isSelected = selectedCategory === cat.slug;
              const count = categoryCounts[cat.slug] || 0;
              return (
                <button
                  key={cat.slug}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-3 py-1.5 text-xs font-mono rounded transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-accent-purple/15 text-accent-purple border border-accent-purple/40 shadow-[0_0_12px_rgba(224,98,181,0.2)] font-semibold'
                      : 'bg-obsidian-950/80 text-zinc-400 hover:text-zinc-200 border border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-accent-purple/80' : 'text-zinc-500'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Collection Details & Controls Toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          {/* Left: Collection Details */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
              <span className="text-[11px] md:text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
                {collectionMeta.eyebrow}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic">
              {collectionMeta.title}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-zinc-400">
              {collectionMeta.description}
            </p>
          </div>

          {/* Right: Controls Toolbar */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            
            {/* Orientation Filter Tabs */}
            <div className="flex items-center bg-obsidian-950/80 border border-white/[0.08] rounded-lg p-1">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                  filter === 'all' 
                    ? 'bg-white/10 text-white font-medium shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All ({orientationCounts.all})
              </button>
              <button
                onClick={() => handleFilterChange('landscape')}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                  filter === 'landscape' 
                    ? 'bg-white/10 text-white font-medium shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Landscape ({orientationCounts.landscape})
              </button>
              <button
                onClick={() => handleFilterChange('portrait')}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                  filter === 'portrait' 
                    ? 'bg-white/10 text-white font-medium shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Portrait ({orientationCounts.portrait})
              </button>
            </div>

            {/* Grid Column Selector (Desktop) */}
            <div className="hidden lg:flex items-center bg-obsidian-950/80 border border-white/[0.08] rounded-lg p-1">
              <button
                onClick={() => setGridCols(2)}
                title="2 Columns (Large)"
                className={`px-2.5 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                  gridCols === 2 ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                2 Col
              </button>
              <button
                onClick={() => setGridCols(3)}
                title="3 Columns (Standard)"
                className={`px-2.5 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                  gridCols === 3 ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                3 Col
              </button>
              <button
                onClick={() => setGridCols(4)}
                title="4 Columns (Compact)"
                className={`px-2.5 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                  gridCols === 4 ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                4 Col
              </button>
            </div>

            {/* Launch Slideshow / Loupe */}
            <button
              onClick={() => {
                if (filteredPhotos.length > 0) {
                  setActiveLoupeIndex(0);
                  setIsPlaying(true);
                }
              }}
              disabled={filteredPhotos.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-purple/15 hover:bg-accent-purple/25 text-accent-purple border border-accent-purple/30 hover:border-accent-purple/50 text-xs font-mono uppercase tracking-wider font-semibold transition-premium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              title="Launch Fullscreen Slideshow"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Slideshow</span>
            </button>

          </div>
        </div>

        {/* Compact Album Selector (Rendered ONLY when active collection has non-empty published albums) */}
        {visibleAlbums.length > 0 && (
          <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center gap-2.5">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex-shrink-0">
              Album:
            </span>
            <div 
              role="tablist"
              aria-label="Filter by album"
              className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-wrap"
            >
              {/* All images Button */}
              <button
                type="button"
                role="tab"
                aria-selected={selectedAlbum === 'all-images'}
                onClick={() => handleAlbumChange('all-images')}
                className={`group px-3 py-1.5 text-xs font-mono rounded transition-all duration-200 flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                  selectedAlbum === 'all-images'
                    ? 'bg-accent-purple/15 text-accent-purple border border-accent-purple/40 shadow-[0_0_12px_rgba(224,98,181,0.2)] font-semibold'
                    : 'bg-obsidian-950/80 text-zinc-400 hover:text-zinc-200 border border-white/[0.08] hover:border-white/20'
                }`}
              >
                <span className={`w-5 h-5 rounded flex items-center justify-center border text-[10px] transition-colors ${
                  selectedAlbum === 'all-images' 
                    ? 'border-accent-purple/40 bg-accent-purple/20 text-accent-purple' 
                    : 'border-white/10 bg-white/5 text-zinc-400 group-hover:text-zinc-200'
                }`}>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M4 4h7v7H4zm0 9h7v7H4zm9-9h7v7h-7zm0 9h7v7h-7z" />
                  </svg>
                </span>
                <span>All images</span>
                <span className={`text-[10px] font-mono ${selectedAlbum === 'all-images' ? 'text-accent-purple/80' : 'text-zinc-500'}`}>
                  ({categoryPhotos.length})
                </span>
              </button>

              {/* Published Albums */}
              {visibleAlbums.map(alb => {
                const isSelected = selectedAlbum === alb.slug;
                const count = albumCounts[alb.slug] || 0;
                // Fallback to first eligible image thumbnail if no coverUrl specified
                const cover = alb.coverUrl || (categoryPhotos.find(p => p.albumSlug === alb.slug)?.thumb || categoryPhotos.find(p => p.albumSlug === alb.slug)?.src);

                return (
                  <button
                    key={alb.slug}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleAlbumChange(alb.slug)}
                    className={`group px-3 py-1.5 text-xs font-mono rounded transition-all duration-200 flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-accent-purple/15 text-accent-purple border border-accent-purple/40 shadow-[0_0_12px_rgba(224,98,181,0.2)] font-semibold'
                        : 'bg-obsidian-950/80 text-zinc-400 hover:text-zinc-200 border border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    {cover ? (
                      <span className={`relative w-5 h-5 rounded overflow-hidden flex-shrink-0 border ${
                        isSelected ? 'border-accent-purple/50' : 'border-white/10'
                      } bg-black/50`}>
                        <Image
                          src={cover}
                          alt=""
                          fill
                          sizes="20px"
                          className="object-cover object-center"
                        />
                      </span>
                    ) : (
                      <span className={`w-5 h-5 rounded flex items-center justify-center border text-[10px] ${
                        isSelected ? 'border-accent-purple/40 bg-accent-purple/20 text-accent-purple' : 'border-white/10 bg-white/5 text-zinc-400'
                      }`}>
                        #
                      </span>
                    )}
                    <span>{alb.title}</span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-accent-purple/80' : 'text-zinc-500'}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 2. Photo Grid Arena */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPhotos.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center border border-white/[0.08] rounded-2xl bg-obsidian-950/60 p-8 my-8">
            <p className="text-zinc-400 font-mono text-sm">
              No images found with the selected filter.
            </p>
            {filter !== 'all' && (
              <button
                onClick={() => handleFilterChange('all')}
                className="mt-4 px-4 py-2 text-xs font-mono rounded bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer"
              >
                Reset orientation to All
              </button>
            )}
          </div>
        ) : (
          <div 
            className={`grid gap-4 sm:gap-6 ${
              gridCols === 2 
                ? 'grid-cols-1 md:grid-cols-2' 
                : gridCols === 4 
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id || photo.filename}
                onClick={() => setActiveLoupeIndex(index)}
                className="group relative rounded-xl overflow-hidden bg-obsidian-950/70 border border-white/[0.08] hover:border-accent-purple/50 shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.18)] transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Container with Aspect Ratio */}
                <div className="relative w-full aspect-[3/2] overflow-hidden bg-zinc-950">
                  <Image
                    src={photo.src}
                    alt={`Photograph ${photo.filename}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Hover Zoom Icon & Metadata Tag */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-obsidian-950/80 backdrop-blur-md border border-white/10 rounded-full p-2 text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>

                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-mono tracking-widest uppercase bg-obsidian-950/90 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded text-zinc-300">
                      {photo.orientation} &bull; {photo.width}x{photo.height}
                    </span>
                  </div>
                </div>

                {/* Bottom Caption Strip */}
                <div className="px-4 py-2.5 bg-obsidian-950/90 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-300 font-medium tracking-wide">
                    {photo.filename}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Lightroom Loupe (Full-Screen Studio Lightbox) */}
      {isLoupeOpen && currentPhoto && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          className="fixed inset-0 z-[100] bg-[#070709]/98 backdrop-blur-2xl flex flex-col justify-between select-none animate-fade-in"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          
          {/* Loupe Top Bar */}
          <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.08] bg-obsidian-950/60 backdrop-blur-md z-20">
            
            {/* Left: Photo Title & EXIF */}
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono font-semibold text-white tracking-wider">
                {currentPhoto.filename}
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                {currentPhoto.width} &times; {currentPhoto.height} &bull; {currentPhoto.orientation}
              </span>
            </div>

            {/* Middle: Index Counter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-zinc-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full tracking-widest">
                {String(activeLoupeIndex + 1).padStart(2, '0')} / {String(filteredPhotos.length).padStart(2, '0')}
              </span>
            </div>

            {/* Right: Studio Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* Slideshow Play / Pause */}
              <button
                onClick={() => setIsPlaying(prev => !prev)}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isPlaying 
                    ? 'bg-accent-purple/20 border-accent-purple text-accent-purple' 
                    : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
                title={isPlaying ? "Pause Slideshow (Space)" : "Play Slideshow (Space)"}
                aria-label="Toggle Slideshow"
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              {/* Zoom 1:1 Toggle */}
              <button
                onClick={() => setIsZoomed(prev => !prev)}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isZoomed 
                    ? 'bg-white/20 border-white text-white' 
                    : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
                title="Toggle Zoom (Z)"
                aria-label="Toggle Zoom"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </button>

              {/* Filmstrip Toggle */}
              <button
                onClick={() => setShowFilmstrip(prev => !prev)}
                className={`hidden md:block p-2 rounded-lg border transition-colors cursor-pointer ${
                  showFilmstrip 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white/5 border-white/10 text-zinc-500 hover:text-zinc-300'
                }`}
                title="Toggle Filmstrip (T)"
                aria-label="Toggle Filmstrip"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="hidden sm:block p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Fullscreen Mode (F)"
                aria-label="Fullscreen Mode"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Close (ESC)"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

            </div>
          </div>

          {/* Main Loupe Viewing Stage */}
          <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
            
            {/* Left Nav Button / Hotspot */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-obsidian-950/70 border border-white/10 hover:border-accent-purple/50 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-premium hover:scale-110 shadow-xl cursor-pointer"
              aria-label="Previous photograph (Arrow Left)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Nav Button / Hotspot */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-obsidian-950/70 border border-white/10 hover:border-accent-purple/50 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-premium hover:scale-110 shadow-xl cursor-pointer"
              aria-label="Next photograph (Arrow Right)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Large Image Stage */}
            <div 
              className={`relative flex items-center justify-center max-w-full max-h-full transition-all duration-300 ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(prev => !prev)}
            >
              <div className="relative max-w-[90vw] max-h-[72vh] md:max-h-[76vh] flex items-center justify-center">
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.filename}
                  width={currentPhoto.width}
                  height={currentPhoto.height}
                  priority
                  onLoad={() => setIsImageLoaded(true)}
                  className={`max-w-full max-h-[72vh] md:max-h-[76vh] w-auto h-auto object-contain rounded-lg shadow-2xl border border-white/[0.08] transition-opacity duration-300 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-30'
                  }`}
                />
              </div>
            </div>

          </div>

          {/* 4. Lightroom Bottom Filmstrip */}
          {showFilmstrip && (
            <div 
              ref={filmstripRef}
              className="w-full h-20 sm:h-24 bg-obsidian-950/90 border-t border-white/[0.08] backdrop-blur-xl px-4 py-2 flex items-center gap-2.5 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 z-20"
            >
              {filteredPhotos.map((thumbPhoto, tIdx) => {
                const isActive = tIdx === activeLoupeIndex;
                return (
                  <button
                    key={thumbPhoto.id || thumbPhoto.filename}
                    data-index={tIdx}
                    onClick={() => {
                      setIsImageLoaded(false);
                      setIsZoomed(false);
                      setActiveLoupeIndex(tIdx);
                    }}
                    className={`relative flex-shrink-0 h-14 sm:h-16 aspect-[3/2] rounded overflow-hidden border transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'border-accent-purple ring-2 ring-accent-purple/40 scale-105 opacity-100 z-10' 
                        : 'border-white/10 opacity-50 hover:opacity-90 hover:border-white/30'
                    }`}
                    aria-label={`Jump to ${thumbPhoto.filename}`}
                  >
                    <Image
                      src={thumbPhoto.src}
                      alt={thumbPhoto.filename}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </button>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
