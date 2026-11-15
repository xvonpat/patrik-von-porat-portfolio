"use client";

import React, { useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';

const EMAIL = 'xvonpat@gmail.com';
const HANDLE = '@patrikvonporat';

export default function ContactLinks() {
  const [copied, setCopied] = useState(false);
  const resetRef = useRef(0);

  useEffect(() => () => clearTimeout(resetRef.current), []);

  // Not everyone has a mail app behind mailto:, so the address is visible and copyable.
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const field = document.createElement('textarea');
      field.value = EMAIL;
      field.setAttribute('readonly', '');
      field.style.position = 'absolute';
      field.style.left = '-9999px';
      document.body.appendChild(field);
      field.select();
      try { document.execCommand('copy'); } catch { /* nothing else to try */ }
      field.remove();
    }
    setCopied(true);
    clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => setCopied(false), 2200);
    handleLinkClick('Copy Email');
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      ariaLabel: "Patrik von Porat on LinkedIn",
      url: "https://www.linkedin.com/in/patrikvonporat/",
      accent: "cyan",
      iconPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 23.271V1.729C24 .774 23.2 0 22.225 0z"
    },
    {
      name: "X",
      ariaLabel: "Patrik von Porat on X",
      url: "https://x.com/patvonp",
      accent: "purple",
      iconPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
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
    <div className="flex flex-col items-center gap-8 md:gap-9 w-full relative z-10">

      {/* 1. Primary Email CTA */}
      <div className="flex flex-col items-center gap-4 w-full">
        <a
          href={`mailto:${EMAIL}`}
          onClick={() => handleLinkClick('Primary Email CTA')}
          className="email-cta-btn group relative inline-flex items-center justify-center h-[52px] px-8 sm:px-10 rounded-full text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono text-center backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-premium isolate overflow-visible hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950"
          aria-label="Send an email to Patrik von Porat"
        >
          {/* Layer 1: Atmospheric Bloom */}
          <div className="email-cta-bloom" aria-hidden="true" />

          {/* Layer 2: Base Surface Background & Base Border */}
          <div className="email-cta-surface" aria-hidden="true" />

          {/* Layer 3: Aurora Orbit Light Sweep Border */}
          <div className="email-cta-border-orbit" aria-hidden="true" />

          {/* Content (z-index above layers) */}
          <div className="relative z-[3] flex items-center justify-center gap-2.5">
            <svg 
              className="w-4 h-4 email-cta-icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Send an Email</span>
            <span className="email-cta-arrow inline-block" aria-hidden="true">&rarr;</span>
          </div>
        </a>

        {/* Visible address with copy */}
        <div className="flex items-center gap-2 text-sm font-mono text-zinc-300">
          <span className="select-all tracking-wide">{EMAIL}</span>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-obsidian-950/60 text-[11px] uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white/25 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
            aria-label={copied ? 'Email address copied' : 'Copy email address'}
          >
            {copied ? (
              <svg className="w-3.5 h-3.5 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <span className="sr-only" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
        </div>
      </div>

      {/* 2. Restrained Divider & Secondary Section Label */}
      <div className="flex flex-col items-center gap-3.5 w-full">
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span className="text-xs font-mono tracking-[0.3em] text-zinc-400 uppercase font-semibold">
          ELSEWHERE
        </span>
      </div>

      {/* 3. Secondary External Channels (3 Items: LinkedIn, X, Instagram) */}
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 max-w-sm sm:max-w-none mx-auto">
          {socialLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url}
              onClick={() => handleLinkClick(link.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2.5 sm:gap-3 w-[76px] sm:w-20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 rounded-xl p-1 min-w-[48px] min-h-[48px]"
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
        <p className="mt-4 text-center text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
          {HANDLE} on every channel
        </p>
      </div>

    </div>
  );
}
