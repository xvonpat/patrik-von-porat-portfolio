import React from 'react';
import ArtClient from './ArtClient';

export const metadata = {
  title: "Art | Patrik von Porat",
  description: "Graphite drawing, synthetic skin tattoo practice, painted miniatures, and 3D prints.",
  alternates: {
    canonical: '/art',
  },
  openGraph: {
    title: "Art | Patrik von Porat",
    description: "Graphite drawing, synthetic skin tattoo practice, painted miniatures, and 3D prints.",
    url: 'https://vonporat.com/art',
  }
};

export default function ArtPage() {
  return <ArtClient />;
}
