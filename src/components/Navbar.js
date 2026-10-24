"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Music', href: '/music' },
    { name: 'Art', href: '/art' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const activeIndex = navLinks.findIndex((link) => {
    if (link.href === '/') {
      return pathname === '/';
    }
    return pathname === link.href || pathname.startsWith(link.href + '/');
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);

  const navContainerRef = useRef(null);
  const auroraRef = useRef(null);
  const linkRefs = useRef([]);
  const currentPosIndexRef = useRef(-1);

  const updateAuroraDOM = useCallback((targetIdx, isInteracting, skipTransition = false) => {
    const aurora = auroraRef.current;
    const container = navContainerRef.current;
    if (!aurora || !container) return;

    if (targetIdx === -1 || targetIdx === null || !linkRefs.current[targetIdx]) {
      aurora.style.opacity = '0';
      currentPosIndexRef.current = -1;
      return;
    }

    const targetEl = linkRefs.current[targetIdx];
    const containerRect = container.getBoundingClientRect();
    const linkRect = targetEl.getBoundingClientRect();
    const styles = window.getComputedStyle(targetEl);
    const padLeft = parseFloat(styles.paddingLeft) || 0;
    const padRight = parseFloat(styles.paddingRight) || 0;
    const padBottom = parseFloat(styles.paddingBottom) || 0;
    // Letter-spacing adds trailing space after the last letter; trim it so the line matches the word.
    const tracking = parseFloat(styles.letterSpacing) || 0;

    // A thin underline under the label text, just below the baseline.
    const left = linkRect.left - containerRect.left + padLeft;
    const width = Math.max(0, linkRect.width - padLeft - padRight - tracking);
    const top = linkRect.top - containerRect.top + linkRect.height - padBottom + 3;

    currentPosIndexRef.current = targetIdx;

    if (skipTransition) {
      aurora.style.transition = 'none';
    }

    aurora.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    aurora.style.width = `${width}px`;
    // Full strength on the item being hovered or focused; a little quieter when it simply marks the current page.
    aurora.style.opacity = isInteracting ? '1' : '0.85';

    if (skipTransition) {
      requestAnimationFrame(() => {
        if (auroraRef.current) {
          auroraRef.current.style.transition = '';
        }
      });
    }
  }, []);

  // Update on route change or initial mount
  useEffect(() => {
    if (hoveredIndex === null && focusedIndex === null) {
      updateAuroraDOM(activeIndex, false, true);
    }
  }, [pathname, activeIndex, hoveredIndex, focusedIndex, updateAuroraDOM]);

  // Font ready check for precise measurements once typography loads
  useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        const currentTarget = hoveredIndex ?? focusedIndex ?? activeIndex;
        updateAuroraDOM(currentTarget, hoveredIndex !== null || focusedIndex !== null);
      });
    }
  }, [hoveredIndex, focusedIndex, activeIndex, updateAuroraDOM]);

  // Container resize observer for responsive layout changes
  useEffect(() => {
    const container = navContainerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      const currentTarget = hoveredIndex ?? focusedIndex ?? activeIndex;
      updateAuroraDOM(currentTarget, hoveredIndex !== null || focusedIndex !== null);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [hoveredIndex, focusedIndex, activeIndex, updateAuroraDOM]);

  const handleMouseEnter = (index) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    setHoveredIndex(index);
    updateAuroraDOM(index, true);
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    setHoveredIndex(null);

    if (focusedIndex !== null) {
      return;
    }

    updateAuroraDOM(activeIndex, false);
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
    updateAuroraDOM(index, true);
  };

  const handleBlur = (e) => {
    if (navContainerRef.current && navContainerRef.current.contains(e.relatedTarget)) {
      return;
    }

    setFocusedIndex(null);

    if (hoveredIndex !== null) {
      return;
    }

    updateAuroraDOM(activeIndex, false);
  };

  const getLinkStyle = (index) => {
    const isInteracting = hoveredIndex !== null || focusedIndex !== null;
    const isTargeted = hoveredIndex !== null 
      ? hoveredIndex === index 
      : (focusedIndex !== null ? focusedIndex === index : activeIndex === index);
    const isActive = activeIndex === index;

    let textColor = 'text-[#b8b9b7]';
    if (isTargeted) {
      textColor = 'text-[#f2f1ed]';
    } else if (isActive && isInteracting) {
      textColor = 'text-zinc-300';
    }

    return `relative z-[1] bg-transparent px-3.5 lg:px-4.5 xl:px-5 py-2 text-xs lg:text-[13px] font-mono tracking-[0.18em] lg:tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan focus-visible:ring-offset-1 focus-visible:ring-offset-obsidian-950 ${textColor} ${isActive ? 'font-semibold' : 'font-normal'}`;
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-obsidian-950/60 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative flex items-center justify-between md:justify-center h-20 md:h-22">
          {/* Logo / Monogram Brand Mark */}
          <div className="flex-shrink-0 flex items-center md:absolute md:left-0">
            <Link 
              href="/" 
              className="brand-link" 
              aria-label="Go to homepage"
            >
              <span className="brand-mark" aria-hidden="true" />
            </Link>
          </div>

          {/* Desktop Navigation Links - Frameless row with shared B2 Light Sweep highlight */}
          <div 
            ref={navContainerRef}
            onMouseLeave={handleMouseLeave}
            className="relative hidden md:flex items-center space-x-1 p-1.5 isolate overflow-visible"
          >
            {/* Shared indicator: thin aurora underline that glides to the hovered or current item */}
            <div
              ref={auroraRef}
              className="nav-indicator"
              style={{
                transform: 'translate3d(0, 0, 0)',
                width: 0,
                opacity: 0,
              }}
              aria-hidden="true"
            />

            {navLinks.map((link, index) => (
              <Link 
                key={link.name} 
                href={link.href}
                ref={(el) => { linkRefs.current[index] = el; }}
                onMouseEnter={() => handleMouseEnter(index)}
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                className={getLinkStyle(index)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // Close Icon
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Menu Icon
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[450px] opacity-100 border-b border-white/5' : 'max-h-0 opacity-0 pointer-events-none'
        } bg-obsidian-950/95 backdrop-blur-xl`}
        id="mobile-menu"
      >
        <div className="px-6 py-4 space-y-3 flex flex-col">
          {navLinks.map((link) => {
            const isLinkActive = link.href === '/' 
              ? pathname === '/' 
              : (pathname === link.href || pathname.startsWith(link.href + '/'));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-base tracking-[0.2em] uppercase font-gothic py-2 transition-colors duration-200 ${
                  isLinkActive ? 'self-start bg-gradient-to-r from-[#a855f7] to-[#5ee6e6] bg-clip-text text-transparent font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
