"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { galleryPhotos } from './galleryData';

export default function GalleryClient() {
  const [filter, setFilter] = useState('all'); // 'all' | 'landscape' | 'portrait'
  const [gridCols, setGridCols] = useState(3); // 2 | 3 | 4
  const [activeLoupeIndex, setActiveLoupeIndex] = useState(null); // null when closed, 0..N when open
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showFilmstrip, setShowFilmstrip] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Check URL query parameter on mount for direct photo deep-linking (e.g. ?photo=IMG_1556 or ?loupe=0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const photoParam = params.get('photo') || params.get('loupe');
      if (photoParam !== null) {
        if (!isNaN(Number(photoParam))) {
          const idx = parseInt(photoParam, 10);
          if (idx >= 0 && idx < galleryPhotos.length) {
            setActiveLoupeIndex(idx);
          }
        } else {
          const foundIdx = galleryPhotos.findIndex(p => p.id === photoParam || p.filename === photoParam || p.filename === `${photoParam}.jpg`);
          if (foundIdx !== -1) {
            setActiveLoupeIndex(foundIdx);
          }
        }
      }
    }
  }, []);

  const filmstripRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const slideIntervalRef = useRef(null);

  // Filtered photos based on active tab
  const filteredPhotos = galleryPhotos.filter(photo => {
    if (filter === 'landscape') return photo.orientation === 'landscape';
    if (filter === 'portrait') return photo.orientation === 'portrait';
    return true;
  });

  const isLoupeOpen = activeLoupeIndex !== null;
  const currentPhoto = isLoupeOpen ? filteredPhotos[activeLoupeIndex] : null;

  // Handle Next / Prev in Loupe
  const handleNext = useCallback(() => {
    if (!filteredPhotos.length) return;
    setIsImageLoaded(false);
    setIsZoomed(false);
    setActiveLoupeIndex(prev => (prev + 1) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (!filteredPhotos.length) return;
    setIsImageLoaded(false);
    setIsZoomed(false);
    setActiveLoupeIndex(prev => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        
        {/* Left: Collection Details */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
            <span className="text-[11px] md:text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
              Adobe Lightroom Collection
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic">
            Summer 2026
          </h1>
          <p className="text-xs sm:text-sm font-mono text-zinc-400">
            {`${galleryPhotos.length} Photographs`} &bull; Curated Web Album &bull; 35mm &amp; Digital
          </p>
        </div>

        {/* Right: Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          
          {/* Orientation Filter Tabs */}
          <div className="flex items-center bg-obsidian-950/80 border border-white/[0.08] rounded-lg p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                filter === 'all' 
                  ? 'bg-white/10 text-white font-medium shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All ({galleryPhotos.length})
            </button>
            <button
              onClick={() => setFilter('landscape')}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                filter === 'landscape' 
                  ? 'bg-white/10 text-white font-medium shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Landscape (21)
            </button>
            <button
              onClick={() => setFilter('portrait')}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                filter === 'portrait' 
                  ? 'bg-white/10 text-white font-medium shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Portrait (3)
            </button>
          </div>

          {/* Grid Column Selector (Desktop) */}
          <div className="hidden lg:flex items-center bg-obsidian-950/80 border border-white/[0.08] rounded-lg p-1">
            <button
              onClick={() => setGridCols(2)}
              title="2 Columns (Large)"
              className={`px-2.5 py-1.5 text-xs font-mono rounded transition-colors ${
                gridCols === 2 ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              2 Col
            </button>
            <button
              onClick={() => setGridCols(3)}
              title="3 Columns (Standard)"
              className={`px-2.5 py-1.5 text-xs font-mono rounded transition-colors ${
                gridCols === 3 ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              3 Col
            </button>
            <button
              onClick={() => setGridCols(4)}
              title="4 Columns (Compact)"
              className={`px-2.5 py-1.5 text-xs font-mono rounded transition-colors ${
                gridCols === 4 ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              4 Col
            </button>
          </div>

          {/* Launch Slideshow / Loupe */}
          <button
            onClick={() => {
              setActiveLoupeIndex(0);
              setIsPlaying(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-purple/15 hover:bg-accent-purple/25 text-accent-purple border border-accent-purple/30 hover:border-accent-purple/50 text-xs font-mono uppercase tracking-wider font-semibold transition-premium"
            title="Launch Fullscreen Slideshow"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>Slideshow</span>
          </button>

        </div>
      </div>

      {/* 2. Photo Grid Arena */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              key={photo.id}
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
      </div>

      {/* 3. Lightroom Loupe (Full-Screen Studio Lightbox) */}
      {isLoupeOpen && currentPhoto && (
        <div 
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
                className={`p-2 rounded-lg border transition-colors ${
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
                className={`p-2 rounded-lg border transition-colors ${
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
                className={`hidden md:block p-2 rounded-lg border transition-colors ${
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
                className="hidden sm:block p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
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
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-colors"
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
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-obsidian-950/70 border border-white/10 hover:border-accent-purple/50 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-premium hover:scale-110 shadow-xl"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-obsidian-950/70 border border-white/10 hover:border-accent-purple/50 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-premium hover:scale-110 shadow-xl"
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
                    key={thumbPhoto.id}
                    data-index={tIdx}
                    onClick={() => {
                      setIsImageLoaded(false);
                      setIsZoomed(false);
                      setActiveLoupeIndex(tIdx);
                    }}
                    className={`relative flex-shrink-0 h-14 sm:h-16 aspect-[3/2] rounded overflow-hidden border transition-all duration-200 ${
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
