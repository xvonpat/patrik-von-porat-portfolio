import React from 'react';
import ArtClient from './ArtClient';

export const metadata = {
  title: "Art | Patrik von Porat",
  description: "Graphite drawing, synthetic skin tattoo practice, painted miniatures, 3D prints, and digital generative experiments.",
  alternates: {
    canonical: '/art',
  },
  openGraph: {
    title: "Art | Patrik von Porat",
    description: "Graphite drawing, synthetic skin tattoo practice, painted miniatures, 3D prints, and digital generative experiments.",
    url: 'https://vonporat.com/art',
  }
};

export default function ArtPage() {
  return <ArtClient />;
}
