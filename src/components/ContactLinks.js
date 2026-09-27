"use client";

import React from 'react';
import { track } from '@vercel/analytics';

export default function ContactLinks() {
  const socialLinks = [
    {
      name: "LinkedIn",
      ariaLabel: "Patrik von Porat on LinkedIn",
      url: "https://www.linkedin.com/in/patrikvonporat/",
      accent: "cyan",
      iconPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 23.271V1.729C24 .774 23.2 0 22.225 0z"
    },
    {
      name: "Threads",
      ariaLabel: "Patrik von Porat on Threads",
      url: "https://www.threads.com/@patrikvonporat",
      accent: "purple",
      iconPath: "M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z"
    },
    {
      name: "Instagram",
      ariaLabel: "Patrik von Porat on Instagram",
      url: "https://www.instagram.com/patrikvonporat/",
      accent: "purple",
      iconPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
    }
  ];

  const handleLinkClick = (name) => {
    try {
      track('Outbound Link Click', { platform: name });
    } catch {
      // analytics fail-safe
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 md:gap-12 w-full max-w-3xl relative z-10">
      
      {/* 1. Primary Email CTA */}
      <div className="flex flex-col items-center w-full">
        <a 
          href="mailto:xvonpat@gmail.com"
          onClick={() => handleLinkClick('Primary Email CTA')}
          className="group h-[52px] px-8 sm:px-10 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-white/20 hover:border-accent-purple/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_18px_rgba(139,92,246,0.20)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950"
          aria-label="Send an email to Patrik von Porat"
        >
          <svg 
            className="w-4 h-4 text-accent-purple group-hover:text-white transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Send an Email</span>
          <span className="text-accent-purple group-hover:translate-x-0.5 transition-transform inline-block" aria-hidden="true">&rarr;</span>
        </a>
      </div>

      {/* 2. Restrained Divider & Secondary Section Label */}
      <div className="flex flex-col items-center gap-3.5 w-full">
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span className="text-xs font-mono tracking-[0.3em] text-zinc-400 uppercase font-semibold">
          ELSEWHERE
        </span>
      </div>

      {/* 3. Secondary External Channels (3 Items: LinkedIn, Threads, Instagram) */}
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 max-w-sm sm:max-w-none mx-auto">
          {socialLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url}
              onClick={() => handleLinkClick(link.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2.5 sm:gap-3 w-[76px] sm:w-20 md:w-24 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 rounded-xl p-1 min-w-[48px] min-h-[48px]"
              aria-label={link.ariaLabel}
            >
              <div className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full isolate overflow-visible bg-transparent">
                {/* Layer 1: Atmospheric Bloom */}
                <div className="aurora-orbit-bloom" aria-hidden="true" />

                {/* Layer 2: Base Restrained Outline */}
                <div className="aurora-orbit-base-ring" aria-hidden="true" />

                {/* Layer 3: Animated Aurora Orbit Ring */}
                <div className="aurora-orbit-ring" aria-hidden="true" />

                {/* Icon */}
                <div className="relative z-[3] flex items-center justify-center aurora-orbit-icon transform group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 transition-transform duration-300 ease-out">
                  <svg 
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-zinc-400 group-hover:text-[#f2f1ed] group-focus-visible:text-[#f2f1ed] transition-colors duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={link.iconPath} />
                  </svg>
                </div>
              </div>
              <span className="text-[11px] sm:text-xs md:text-[13px] font-mono tracking-wider text-zinc-400 uppercase group-hover:text-[#f2f1ed] group-focus-visible:text-[#f2f1ed] transition-colors duration-300 font-medium">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
