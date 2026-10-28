"use client";

import React, { createContext, useCallback, useContext, useState } from 'react';
import Image from 'next/image';
import LightboxGallery from '@/components/LightboxGallery';

const IMG = '/images/projects/home-control-panel';

const ShotContext = createContext(null);

/* Holds every screenshot on the page so the lightbox can browse between them. */
export function ShotLightbox({ shots, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((src) => {
    const idx = shots.findIndex((shot) => shot.src === src);
    if (idx === -1) return;
    setCurrentIndex(idx);
    setIsOpen(true);
  }, [shots]);

  const close = useCallback(() => setIsOpen(false), []);

  const images = shots.map((shot) => ({
    src: `${IMG}/${shot.src}`,
    title: shot.title,
    alt: shot.alt,
    caption: shot.caption,
    category: 'Home Control Panel',
  }));

  return (
    <ShotContext.Provider value={{ shots, open }}>
      {children}
      <LightboxGallery
        isOpen={isOpen}
        onClose={close}
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </ShotContext.Provider>
  );
}

/* A screenshot with its caption. Clicking it opens the lightbox. */
export function Shot({ src, priority = false, sizes, className = '' }) {
  const { shots, open } = useContext(ShotContext);
  const shot = shots.find((s) => s.src === src);
  const { phone = false, alt, caption } = shot;

  return (
    <figure className={`flex flex-col gap-3 min-w-0 ${phone ? 'w-full max-w-[280px] mx-auto' : 'w-full'} ${className}`}>
      <button
        type="button"
        onClick={() => open(src)}
        aria-haspopup="dialog"
        className={`group block w-full overflow-hidden cursor-zoom-in border border-white/[0.08] bg-obsidian-950/80 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-colors hover:border-accent-purple/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-purple focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian-950 ${phone ? 'rounded-[1.75rem]' : 'rounded-xl md:rounded-2xl'}`}
      >
        <Image
          src={`${IMG}/${src}`}
          alt={alt}
          width={phone ? 1170 : 2880}
          height={phone ? 2532 : 1800}
          priority={priority}
          sizes={sizes || (phone ? '280px' : '(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px')}
          className="w-full h-auto block"
        />
        <span className="sr-only">Open larger view</span>
      </button>
      {caption && (
        <figcaption className="text-xs md:text-[13px] text-zinc-400 leading-relaxed text-pretty">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
