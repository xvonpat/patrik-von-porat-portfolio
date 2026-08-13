import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-obsidian-950/80 border-t border-white/5 py-12 relative z-10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand/Credits */}
        <div className="text-center md:text-left">
          <p className="font-gothic text-sm tracking-widest text-white">PATRIK VON PORAT</p>
          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Guitarist &middot; Artist &middot; Optimizer</p>
        </div>

        {/* Center line decoration */}
        <div className="hidden md:block h-[1px] flex-grow mx-8 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Footer Links & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-6 text-xs text-zinc-500 uppercase tracking-widest">
            <Link href="/about" className="hover:text-accent-purple transition-colors duration-200">About</Link>
            <Link href="/blog" className="hover:text-accent-cyan transition-colors duration-200">Blog</Link>
            <Link href="/contact" className="hover:text-accent-purple transition-colors duration-200">Contact</Link>
          </div>
          <p className="text-xs text-zinc-600 mt-2 font-mono">
            &copy; {currentYear} Patrik von Porat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
