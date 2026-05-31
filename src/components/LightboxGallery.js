"use client";

import React, { useEffect, useState } from 'react';

export default function LightboxGallery({
  isOpen,
  onClose,
  images = [],
  currentIndex,
  setCurrentIndex
}) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset loaded animation state on index change
  useEffect(() => {
    setIsLoaded(false);
  }, [currentIndex]);

  // Close on ESC, Navigate with Left/Right Arrow keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Block body scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, images]);

  if (!isOpen || images.length === 0) return null;

  const activeImage = images[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Mobile touch swipe logic
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-obsidian-950/95 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Top Header / Action Bar */}
      <div 
        className="w-full flex items-center justify-between px-6 py-4 border-b border-white/5 bg-obsidian-950/40 backdrop-blur-md relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
            {activeImage.category || 'Artwork'}
          </span>
          <span className="text-sm font-semibold font-gothic tracking-wider text-white mt-0.5">
            {activeImage.title}
          </span>
        </div>

        {/* Counter and Close Button */}
        <div className="flex items-center gap-6">
          <span className="text-xs font-mono text-zinc-400 tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full select-none">
            {currentIndex + 1} / {images.length}
          </span>
          
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-white hover:bg-accent-purple/20 hover:border-accent-purple/50 transition-premium shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-95"
            aria-label="Close Lightbox"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Image Viewer Area */}
      <div 
        className="flex-grow flex items-center justify-between relative px-4 md:px-12 select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Navigation Arrow Left */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="hidden md:flex w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-premium relative z-10"
          aria-label="Previous Image"
        >
          <svg className="w-6 h-6 transform -translate-x-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dynamic Image Container */}
        <div 
          className="flex-grow flex items-center justify-center max-h-[70vh] md:max-h-[78vh] max-w-full relative z-0"
          onClick={(e) => e.stopPropagation()}
        >
          {activeImage.src && !activeImage.src.includes('...') ? (
            <img 
              src={activeImage.src} 
              alt={activeImage.alt || activeImage.title}
              onLoad={() => setIsLoaded(true)}
              className={`max-h-[68vh] md:max-h-[76vh] max-w-[90vw] md:max-w-[70vw] object-contain rounded-lg border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 transform ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            />
          ) : (
            <div className="w-[50vw] aspect-[4/3] rounded-lg border border-white/10 bg-gradient-to-tr from-zinc-900 via-neutral-950 to-zinc-900 flex flex-col items-center justify-center text-center p-8 shadow-2xl">
              <svg className="w-12 h-12 text-zinc-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{activeImage.title}</span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mt-1">Placeholder Image</span>
            </div>
          )}
        </div>

        {/* Navigation Arrow Right */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="hidden md:flex w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-premium relative z-10"
          aria-label="Next Image"
        >
          <svg className="w-6 h-6 transform translate-x-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom Caption Bar */}
      <div 
        className="w-full text-center px-6 py-6 border-t border-white/5 bg-obsidian-950/40 backdrop-blur-md relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed max-w-xl mx-auto">
          {activeImage.caption || 'No caption available.'}
        </p>
        
        {/* Swipe cue for mobile */}
        <span className="md:hidden text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-500 block mt-3">
          ← Swipe to browse →
        </span>
      </div>
    </div>
  );
}
