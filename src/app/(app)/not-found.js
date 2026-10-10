import React from 'react';
import Link from 'next/link';
import CtaButton from '@/components/CtaButton';

export const metadata = {
  title: "404 · Page Not Found | Patrik von Porat",
  description: "The page or note you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 flex flex-col items-center justify-center text-center min-h-[70vh] relative z-10">
      {/* Status Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-900/80 border border-white/10 text-xs font-mono text-zinc-400 mb-6 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
        <span className="tracking-widest uppercase">404 · Record Not Found</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-bone tracking-tight leading-tight max-w-2xl mb-6">
        Lost in the archives.
      </h1>

      {/* Explanation */}
      <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-10 text-pretty">
        The page, note, or artifact you are looking for has been relocated, archived, or never existed in this realm.
      </p>

      {/* Action Pathways */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <CtaButton 
          href="/" 
          variant="primary"
          className="w-full sm:w-auto px-8 py-3 text-xs md:text-sm"
        >
          Return to Hub
        </CtaButton>
        <CtaButton 
          href="/projects" 
          variant="secondary"
          className="w-full sm:w-auto px-6 py-3 text-xs md:text-sm"
        >
          Selected Work
        </CtaButton>
        <CtaButton 
          href="/blog" 
          variant="secondary"
          className="w-full sm:w-auto px-6 py-3 text-xs md:text-sm"
        >
          Journal
        </CtaButton>
      </div>

      {/* Subtle Return Hint */}
      <div className="mt-12 text-xs font-mono text-zinc-500">
        <span>Looking for something specific? </span>
        <Link href="/contact" className="text-accent-cyan hover:underline transition-colors">
          Get in touch &rarr;
        </Link>
      </div>
    </div>
  );
}
