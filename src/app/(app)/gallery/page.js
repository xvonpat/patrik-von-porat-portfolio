import React from 'react';
import GalleryClient from './GalleryClient';

export const metadata = {
  title: "Photo Gallery | Patrik von Porat",
  description: "Curated photography collection and Lightroom web gallery.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: "Photo Gallery | Patrik von Porat",
    description: "Curated photography collection and Lightroom web gallery.",
    url: 'https://vonporat.com/gallery',
  }
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-obsidian-950 text-zinc-100 selection:bg-accent-purple/30 selection:text-white relative">
      <GalleryClient />
    </main>
  );
}
