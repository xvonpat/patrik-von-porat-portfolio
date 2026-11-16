'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HomeTest.module.css';

/**
 * Selected Work as a large, image-led showcase (layout experiment for /home-test).
 *
 * Native horizontal scrolling with CSS scroll snap does the work, so the slides stay usable
 * without JavaScript and swipe naturally on touch. The script only wires the previous/next
 * and marker buttons, keeps the counter in step with the scroll position and announces the
 * slide once scrolling has settled. Navigation is finite: the buttons disable at the ends.
 */
export default function WorkShowcase({ items }) {
  const trackRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const pendingRef = useRef(null);   // Slide a button click is currently scrolling to
  const settledRef = useRef(0);      // Slide the track last came to rest on
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState('');
  const count = items.length;

  const slideLeft = (track, index) => {
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const max = track.scrollWidth - track.clientWidth;
    return Math.min(Math.max(0, track.children[index].offsetLeft - pad), max);
  };

  const nearestSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    let best = 0;
    let bestDistance = Infinity;
    for (let i = 0; i < track.children.length; i++) {
      const distance = Math.abs(slideLeft(track, i) - track.scrollLeft);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    }
    return best;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let rafId = 0;
    let debounceId = 0;

    const settle = () => {
      pendingRef.current = null;
      const index = nearestSlide();
      setCurrent(index);
      if (index !== settledRef.current) {
        settledRef.current = index;
        setStatus(`Slide ${index + 1} of ${count}: ${items[index].title}`);
      }
    };

    const hasScrollEnd = 'onscrollend' in window;
    const onScroll = () => {
      if (!hasScrollEnd) {
        clearTimeout(debounceId);
        debounceId = setTimeout(settle, 140);
      }
      // A button click already set the counter; recomputing during its smooth scroll would flicker.
      if (pendingRef.current !== null || rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        setCurrent(nearestSlide());
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    if (hasScrollEnd) track.addEventListener('scrollend', settle);
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (hasScrollEnd) track.removeEventListener('scrollend', settle);
      cancelAnimationFrame(rafId);
      clearTimeout(debounceId);
    };
  }, [count, items, nearestSlide]);

  const goTo = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(count - 1, index));
    pendingRef.current = target;
    setCurrent(target);
    track.scrollTo({ left: slideLeft(track, target) });
  };

  // Rapid clicks build on the slide already being scrolled to, not on the nearest one.
  const step = (direction) => {
    const target = (pendingRef.current ?? current) + direction;
    goTo(target);
    // The button about to disable would drop focus, so hand it to the opposite control.
    if (target <= 0) nextRef.current?.focus();
    else if (target >= count - 1) prevRef.current?.focus();
  };

  const controlClass = `${styles.control} inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan disabled:cursor-default disabled:border-white/10 disabled:text-white/35`;

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Selected work" className="flex flex-col gap-6 md:gap-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <p className="font-mono text-xs tracking-[0.3em] text-zinc-300" aria-hidden="true">
          <span className="text-white">{String(current + 1).padStart(2, '0')}</span>
          <span className="mx-2 text-zinc-500">/</span>
          <span>{String(count).padStart(2, '0')}</span>
        </p>
        <div className="flex items-center gap-2.5">
          <button ref={prevRef} type="button" className={controlClass} onClick={() => step(-1)} disabled={current <= 0} aria-label="Previous slide">
            <span aria-hidden="true">&larr;</span>
          </button>
          <button ref={nextRef} type="button" className={controlClass} onClick={() => step(1)} disabled={current >= count - 1} aria-label="Next slide">
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>

      <div ref={trackRef} className={styles.track} tabIndex={0} role="group" aria-label="Slides">
        {items.map((item, index) => {
          const isCyan = item.accent === 'cyan';
          const accentText = isCyan ? 'text-accent-cyan' : 'text-accent-purple';
          const linkClass = `inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest ${accentText} transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-white focus-visible:outline-none focus-visible:underline`;
          return (
            <article
              key={item.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              className="group relative grid w-[86vw] max-w-[72rem] grid-cols-1 overflow-hidden border border-white/[0.08] bg-obsidian-900/70 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-obsidian-950 lg:aspect-auto lg:min-h-[30rem]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 700px, 86vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                />
              </div>

              <div className="flex flex-col justify-between gap-8 p-6 md:p-8 lg:p-10">
                <div className="flex flex-col gap-4">
                  <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.25em] md:text-xs ${accentText}`}>
                    {item.category}
                  </p>
                  <h3 className="font-gothic text-3xl font-semibold tracking-tight text-white md:text-4xl xl:text-5xl">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-zinc-300 md:text-base md:leading-7 text-pretty">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-5">
                  {item.isExternal ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <span>{item.ctaText}</span>
                      <span aria-hidden="true">&#8599;</span>
                    </a>
                  ) : (
                    <Link href={item.link} className={linkClass}>
                      <span>{item.ctaText}</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">{status}</p>

      <nav aria-label="Choose a slide" className="mx-auto flex w-full max-w-7xl items-center gap-2 px-6 lg:px-8">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={styles.marker}
            aria-label={`Go to slide ${index + 1}: ${item.title}`}
            aria-current={index === current ? 'true' : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </nav>
    </div>
  );
}
