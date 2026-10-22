import React from 'react';
import ArtClient from './ArtClient';

export const metadata = {
  title: "Art | Patrik von Porat",
  description: "Graphite and charcoal studies, synthetic-skin tattoo practice and hand-painted resin miniatures. A curated look at the visual practice of Patrik von Porat.",
  alternates: {
    canonical: '/art',
  },
  openGraph: {
    title: "Art | Patrik von Porat",
    description: "Graphite and charcoal studies, synthetic-skin tattoo practice and hand-painted resin miniatures. A curated look at the visual practice of Patrik von Porat.",
    url: 'https://vonporat.com/art',
    images: [
      {
        url: '/images/PvP2.png',
        width: 1200,
        height: 630,
        alt: 'Patrik von Porat - Art',
      },
    ],
  }
};

export default function ArtPage() {
  return <ArtClient />;
}
