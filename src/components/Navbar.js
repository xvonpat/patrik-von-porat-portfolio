"use client";

import React, { useState } from 'react';
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
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const getLinkStyle = (href) => {
    const isActive = pathname === href;
    return `relative px-3.5 lg:px-4.5 xl:px-5 py-2 rounded-full text-xs lg:text-[13px] font-mono tracking-[0.18em] lg:tracking-[0.2em] uppercase border transition-premium whitespace-nowrap ${
      isActive 
        ? 'text-white bg-white/[0.06] border-white/[0.12] shadow-[0_0_20px_rgba(139,92,246,0.15)] font-semibold' 
        : 'text-zinc-300 hover:text-white bg-transparent border-transparent hover:bg-white/[0.03] hover:border-white/[0.05]'
    }`;
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-obsidian-950/60 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-22">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center transition-premium" aria-label="Home">
              {/* Logo removed for now */}
            </Link>
          </div>

          {/* Desktop Navigation Links - Floating designed capsule component */}
          <div className="hidden md:flex space-x-1 items-center bg-obsidian-900/80 border border-white/[0.08] rounded-full p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={getLinkStyle(link.href)}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none transition-colors duration-200"
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-base tracking-[0.2em] uppercase font-gothic py-2 transition-colors duration-200 ${
                pathname === link.href ? 'text-accent-purple font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
