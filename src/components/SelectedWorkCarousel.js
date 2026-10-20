'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';

const DESKTOP_QUERY = '(min-width: 1024px)';
const MIN_SCALE = 0.86;
const MIN_OPACITY = 0.5;

/**
 * Selected Work cards. On desktop they sit in a horizontal, snap-scrolling row where the
 * card nearest the centre grows smoothly as you scroll; below 1024px they stack as before.
 */
export default function SelectedWorkCarousel({ cards, initialIndex = Math.floor(cards.length / 2) }) {
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const frameRef = useRef(0);

  const isDesktop = () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches;

  const update = useCallback(() => {
    frameRef.current = 0;
    const track = trackRef.current;
    if (!track) return;
    const items = itemRefs.current.filter(Boolean);

    if (!isDesktop()) {
      items.forEach((el) => {
        el.style.transform = '';
        el.style.opacity = '';
        el.removeAttribute('data-focused');
      });
      return;
    }

    const rect = track.getBoundingClientRect();
    const centre = rect.left + rect.width / 2;
    items.forEach((el) => {
      const r = el.getBoundingClientRect();
      const distance = Math.abs(r.left + r.width / 2 - centre) / r.width;
      const t = Math.max(0, 1 - distance);
      const focus = t * t * (3 - 2 * t);
      el.style.transform = `scale(${MIN_SCALE + (1 - MIN_SCALE) * focus})`;
      el.style.opacity = String(MIN_OPACITY + (1 - MIN_OPACITY) * focus);
      if (focus > 0.6) el.setAttribute('data-focused', '');
      else el.removeAttribute('data-focused');
    });
  }, []);

  const requestUpdate = useCallback(() => {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
  }, [update]);

  const centreOn = useCallback((index, behavior = 'smooth') => {
    const track = trackRef.current;
    const el = itemRefs.current[index];
    if (!track || !el) return;
    const left = el.offsetLeft + el.offsetWidth / 2 - track.clientWidth / 2;
    track.scrollTo({ left, behavior });
  }, []);

  const closestIndex = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const centre = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    });
    return best;
  };

  const step = (direction) => {
    const next = Math.min(cards.length - 1, Math.max(0, closestIndex() + direction));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    centreOn(next, reduced ? 'auto' : 'smooth');
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const media = window.matchMedia(DESKTOP_QUERY);

    // Open with the chosen card (the middle one by default) in focus.
    const start = () => {
      if (media.matches) centreOn(initialIndex, 'auto');
      update();
    };
    start();

    track.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    media.addEventListener('change', start);
    return () => {
      track.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      media.removeEventListener('change', start);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [initialIndex, centreOn, requestUpdate, update]);

  const arrowClass =
    'hidden lg:flex absolute top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-obsidian-950/80 text-zinc-300 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-purple';

  return (
    <div className="relative">
      <button type="button" aria-label="Previous project" onClick={() => step(-1)} className={`${arrowClass} left-0`}>
        <span aria-hidden="true">&larr;</span>
      </button>
      <button type="button" aria-label="Next project" onClick={() => step(1)} className={`${arrowClass} right-0`}>
        <span aria-hidden="true">&rarr;</span>
      </button>

      <div
        ref={trackRef}
        className="selected-work-track grid grid-cols-1 gap-6 md:gap-7 lg:flex lg:gap-6 lg:overflow-x-auto lg:snap-x lg:snap-mandatory lg:py-6 lg:px-[calc(50%-210px)]"
      >
        {cards.map((card, idx) => {
          const accentClass = card.accent === 'purple' ? 'text-accent-purple' : 'text-accent-cyan';

          return (
            <div
              key={card.title}
              ref={(el) => { itemRefs.current[idx] = el; }}
              className="selected-work-item lg:w-[420px] lg:shrink-0 lg:snap-center lg:origin-center lg:will-change-transform"
            >
              <GlassCard accent={card.accent} className="p-5 md:p-6 flex flex-col justify-between h-full group">
                <div className="flex flex-col gap-4">
                  {/* Visual Showcase Banner */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-md group-hover:border-white/20 transition-all duration-500">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
                      className="selected-work-image w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>

                  {/* Category & Title */}
                  <div className="flex flex-col gap-1.5 pb-2.5 border-b border-white/5">
                    <span className={`text-[10px] md:text-[11px] font-mono uppercase tracking-wider font-semibold ${accentClass}`}>
                      {card.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white font-gothic">
                      {card.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-white/5 flex justify-end">
                  <Link
                    href={card.link}
                    target={card.isExternal ? '_blank' : undefined}
                    rel={card.isExternal ? 'noopener noreferrer' : undefined}
                    className={`text-xs font-mono uppercase tracking-widest ${accentClass} group-hover:text-white transition-colors flex items-center gap-1 font-semibold`}
                  >
                    {card.ctaText} {card.isExternal ? <span aria-hidden="true">&#8599;</span> : <>&rarr;</>}
                  </Link>
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
