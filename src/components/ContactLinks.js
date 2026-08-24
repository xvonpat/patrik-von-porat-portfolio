"use client";

import React from 'react';
import { track } from '@vercel/analytics';

export default function ContactLinks() {
  const socialLinks = [
    {
      name: "Spotify",
      ariaLabel: "Patrik von Porat on Spotify",
      url: "https://open.spotify.com/artist/1w5nRV4hbOrPFuYRYuvgnB?si=8IEsYIjORUi6ubXK_daH3g",
      accent: "purple",
      iconPath: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.983-.336.075-.67-.136-.75-.472-.075-.336.136-.67.472-.75 3.856-.882 7.15-.5 9.822 1.137.295.18.387.565.207.86zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.67-1.114 8.243-.57 11.35 1.343.367.226.487.707.26 1.074zm.11-2.824C14.49 8.7 8.04 8.487 4.31 9.62c-.573.173-1.18-.154-1.354-.727-.173-.573.154-1.18.727-1.354 4.314-1.31 11.43-1.06 15.45 1.33.516.307.687.973.38 1.49-.307.515-.973.686-1.49.38z"
    },
    {
      name: "YouTube",
      ariaLabel: "Patrik von Porat on YouTube",
      url: "https://www.youtube.com/@creativeoverdrive",
      accent: "purple",
      iconPath: "M23.498 6.163c-.272-1.022-1.074-1.826-2.099-2.099C19.544 3.5 12 3.5 12 3.5s-7.544 0-9.4.564C1.576 4.337.773 5.14.502 6.163 0 8.07 0 12 0 12s0 3.93.502 5.837c.271 1.022 1.074 1.826 2.099 2.099 1.856.564 9.4.564 9.4.564s7.544 0 9.4-.564c1.025-.273 1.827-1.077 2.099-2.099.502-1.907.502-5.837.502-5.837s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    },
    {
      name: "Instagram",
      ariaLabel: "Patrik von Porat on Instagram",
      url: "https://www.instagram.com/patrikvonporat/",
      accent: "purple",
      iconPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
    },
    {
      name: "Patreon",
      ariaLabel: "Support Realmforged on Patreon",
      url: "https://www.patreon.com/c/realmforgedguild",
      accent: "cyan",
      iconPath: "M22.957 7.21c-.004-3.078-2.684-5.554-6.055-5.554-3.7 0-6.711 3.012-6.711 6.712 0 3.678 2.993 6.677 6.711 6.677 3.393 0 6.055-2.476 6.055-5.554v-2.28zM2.08 1.656H5.05v20.688H2.08V1.656z"
    },
    {
      name: "Bandcamp",
      ariaLabel: "Realmforged on Bandcamp",
      url: "https://realmforged.bandcamp.com/",
      accent: "cyan",
      iconPath: "M0 18.75h14.887L24 5.25H9.113L0 18.75z"
    },
    {
      name: "LinkedIn",
      ariaLabel: "Patrik von Porat on LinkedIn",
      url: "https://www.linkedin.com/in/patrikvonporat/",
      accent: "cyan",
      iconPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 23.271V1.729C24 .774 23.2 0 22.225 0z"
    }
  ];

  const accentClasses = {
    purple: "hover:border-accent-purple/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.22)]",
    cyan: "hover:border-accent-cyan/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.22)]",
  };

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
          className="group h-[52px] px-8 sm:px-10 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-white/20 hover:border-accent-purple/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950"
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

      {/* 3. Secondary External Channels (6 Items: 1 row on desktop, 3x2 on mobile) */}
      <div className="w-full">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-6 md:gap-8 max-w-[340px] sm:max-w-none mx-auto justify-items-center justify-center">
          {socialLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url}
              onClick={() => handleLinkClick(link.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2.5 sm:gap-3 w-full focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:outline-none rounded-xl p-1 min-w-[48px] min-h-[48px]"
              aria-label={link.ariaLabel}
            >
              <div 
                className={`w-13 h-13 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-obsidian-950/70 backdrop-blur-xl border border-white/[0.08] flex items-center justify-center transition-premium transform group-hover:-translate-y-1 group-hover:bg-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_8px_25px_rgba(0,0,0,0.5)] ${accentClasses[link.accent]}`}
              >
                <svg 
                  className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-zinc-300 group-hover:text-white transition-premium`} 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d={link.iconPath} />
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs md:text-[13px] font-mono tracking-wider text-zinc-400 uppercase group-hover:text-white transition-colors duration-300 font-medium">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
