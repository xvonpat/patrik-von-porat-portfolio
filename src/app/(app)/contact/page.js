import React from 'react';
import ContactLinks from '@/components/ContactLinks';

export const metadata = {
  title: "Link Hub & Contact | Patrik von Porat",
  description: "Connect with Patrik von Porat. Portals to Spotify, YouTube, Bandcamp, Instagram, Patreon, LinkedIn, and direct email contact.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Link Hub & Contact | Patrik von Porat",
    description: "Connect with Patrik von Porat. Portals to Spotify, YouTube, Bandcamp, Instagram, Patreon, LinkedIn, and direct email contact.",
    url: 'https://vonporat.com/contact',
  }
};

export default function Contact() {
  return (
    <div className="max-w-4xl xl:max-w-5xl mx-auto px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-9 md:gap-11 relative items-center text-center justify-center min-h-[70vh] z-10">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center gap-2.5 max-w-2xl">
        <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-accent-purple uppercase font-medium">Connect &amp; Collaborate</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic">Link Hub</h1>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
        <p className="text-base md:text-lg leading-relaxed md:leading-8 text-zinc-300 font-light mt-1">
          Whether you&apos;re here for music, visual art, process work, or collaboration, this is the easiest way to find the right channel. 
          This space connects my creative projects, professional work, and ongoing experiments &mdash; from metal releases and graphite drawings 
          to AI-assisted workflows and continuous improvement.
        </p>
      </div>

      {/* Renders the interactive client-side links grid with custom event tracking */}
      <ContactLinks />

    </div>
  );
}
