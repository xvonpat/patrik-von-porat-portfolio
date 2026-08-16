import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-obsidian-950/90 border-t border-white/[0.06] py-14 relative z-10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand/Credits */}
        <div className="text-center md:text-left">
          <p className="font-gothic text-base tracking-[0.2em] uppercase font-semibold text-white">PATRIK VON PORAT</p>
          <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-widest">Guitarist &middot; Artist &middot; Optimizer</p>
        </div>

        {/* Center line decoration */}
        <div className="hidden md:block h-[1px] flex-grow mx-8 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Footer Links & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-2.5">
          <div className="flex gap-6 text-xs font-mono text-zinc-300 uppercase tracking-widest font-medium">
            <Link href="/about" className="hover:text-accent-purple transition-colors duration-200">About</Link>
            <Link href="/blog" className="hover:text-accent-cyan transition-colors duration-200">Blog</Link>
            <Link href="/contact" className="hover:text-accent-purple transition-colors duration-200">Contact</Link>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            &copy; {currentYear} Patrik von Porat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
