import React from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config.ts';
import GalleryClient from './GalleryClient';
import { galleryPhotos as fallbackPhotos, eddieTheTrooperPhotos, galleryAlbums as fallbackAlbums } from './galleryData';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "Photo Gallery | Patrik von Porat",
  description: "Photo gallery of miniatures, resin prints and photography: build progress from Eddie the Trooper and curated albums shot on 35mm film and digital.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: "Photo Gallery | Patrik von Porat",
    description: "Photo gallery of miniatures, resin prints and photography: build progress from Eddie the Trooper and curated albums shot on 35mm film and digital.",
    url: 'https://vonporat.com/gallery',
  }
};

export default async function GalleryPage() {
  let categories = [];
  let albums = [];
  let images = [];

  try {
    const payload = await getPayload({ config: configPromise });
    const [categoriesRes, albumsRes, imagesRes] = await Promise.all([
      payload.find({
        collection: 'gallery-categories',
        where: {
          status: {
            equals: 'published',
          },
        },
        sort: 'order',
        limit: 100,
      }),
      payload.find({
        collection: 'gallery-albums',
        where: {
          status: {
            equals: 'published',
          },
        },
        sort: 'order',
        depth: 1,
        limit: 100,
      }),
      payload.find({
        collection: 'gallery-images',
        where: {
          status: {
            equals: 'published',
          },
        },
        sort: 'order',
        depth: 1,
        limit: 500,
      }),
    ]);

    categories = (categoriesRes?.docs || []).map(cat => ({
      id: String(cat.id),
      name: cat.name,
      slug: cat.slug,
      eyebrow: cat.eyebrow || null,
      description: cat.description || null,
      order: cat.order || 0,
    }));

    albums = (albumsRes?.docs || []).map(alb => {
      const collectionSlug = (alb.collection && typeof alb.collection === 'object')
        ? alb.collection.slug
        : (categories.find(c => c.id === String(alb.collection))?.slug || null);

      return {
        id: String(alb.id),
        title: alb.title,
        slug: alb.slug,
        collectionSlug: collectionSlug,
        coverUrl: alb.coverUrl || (alb.coverImage?.url) || null,
        description: alb.description || null,
        order: alb.order || 0,
      };
    });

    images = (imagesRes?.docs || []).map((img, idx) => {
      const catSlug = (img.category && typeof img.category === 'object')
        ? img.category.slug
        : (categories.find(c => c.id === String(img.category))?.slug || null);

      const albSlug = (img.album && typeof img.album === 'object')
        ? img.album.slug
        : (albums.find(a => a.id === String(img.album))?.slug || null);

      return {
        id: img.filename ? img.filename.replace(/\.[^/.]+$/, '') : String(img.id),
        filename: img.filename,
        title: img.title || img.filename,
        src: img.imageUrl || (img.image?.url) || `/images/gallery/images/large/${img.filename}`,
        thumb: img.thumbUrl || img.imageUrl || `/images/gallery/images/thumbnails/${img.filename}`,
        width: img.width || 1200,
        height: img.height || 800,
        orientation: img.orientation || 'landscape',
        aspectRatio: img.aspectRatio || '3/2',
        categorySlug: catSlug,
        albumSlug: albSlug,
        project: img.project || null,
        order: img.order || (idx + 1),
      };
    });
  } catch (error) {
    console.error('Failed to fetch gallery collections from Payload, falling back to static data:', error);
  }

  // Fallback to static photographs if DB query returned no images
  if (!images.length) {
    categories = [
      {
        id: '3d-prints',
        name: '3D Prints',
        slug: '3d-prints',
        eyebrow: 'Physical Models',
        description: 'Resin printing, assembly, and hand-painted miniatures',
        order: 1,
      },
      {
        id: 'summer-2026',
        name: 'Summer 2026',
        slug: 'summer-2026',
        eyebrow: 'Adobe Lightroom Collection',
        description: 'Curated Web Album • 35mm & Digital',
        order: 2,
      },
    ];
    albums = fallbackAlbums;
    images = [
      ...fallbackPhotos.map((photo, index) => ({
        ...photo,
        categorySlug: 'summer-2026',
        albumSlug: null,
        order: index + 1,
      })),
      ...eddieTheTrooperPhotos,
    ];
  }

  return (
    <main className="min-h-screen bg-obsidian-950 text-zinc-100 selection:bg-accent-purple/30 selection:text-white relative">
      <GalleryClient initialCategories={categories} initialAlbums={albums} initialImages={images} />
    </main>
  );
}

