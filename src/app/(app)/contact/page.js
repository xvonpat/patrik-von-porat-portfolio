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
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-16 md:gap-20 relative items-center text-center justify-center min-h-[80vh]">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl">
        <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase">Connect & Collaborate</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic">Link Hub</h1>
        <div className="w-16 h-[2px] bg-accent-purple mt-2" />
        <p className="text-sm md:text-base leading-7 text-zinc-400 font-light mt-4">
          Whether you’re here for music, visual art, process work, or collaboration, this is the easiest way to find the right channel. 
          This space connects my creative projects, professional work, and ongoing experiments — from metal releases and graphite drawings 
          to AI-assisted workflows and continuous improvement.
        </p>
      </div>

      {/* Renders the interactive client-side links grid with custom event tracking */}
      <ContactLinks />

    </div>
  );
}
