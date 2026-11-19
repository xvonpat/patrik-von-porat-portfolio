import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/workbench/auth';
import {
  galleryPhotos as fallbackPhotos,
  eddieTheTrooperPhotos,
  darthVaderDioramaPhotos,
  leatherfacePhotos,
  house3DPhotos,
  galleryAlbums as fallbackAlbums,
} from '@/app/(app)/gallery/galleryData';

export async function GET(req) {
  // 1. Independent authentication check
  const { authorized, payload, error } = await verifyAdminAuth(req);
  if (!authorized) {
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 });
  }

  try {
    let dbImages = [];
    let dbAlbums = [];

    // 2. Fetch images from Payload CMS gallery-images collection
    try {
      const [imagesRes, albumsRes] = await Promise.all([
        payload.find({
          collection: 'gallery-images',
          depth: 1,
          limit: 300,
          sort: 'order',
        }),
        payload.find({
          collection: 'gallery-albums',
          depth: 1,
          limit: 100,
          sort: 'order',
        }),
      ]);
      dbImages = imagesRes?.docs || [];
      dbAlbums = albumsRes?.docs || [];
    } catch (dbErr) {
      console.warn('[Workbench Gallery] Could not fetch gallery from Payload DB, falling back to static:', dbErr?.message);
    }

    const seenSrcs = new Set();
    const imagesList = [];
    const albumSet = new Set();
    const categorySet = new Set();

    // Add Payload DB images first
    for (const img of dbImages) {
      const src = img.imageUrl || (img.image && typeof img.image === 'object' ? img.image.url : null) || (img.filename ? `/images/gallery/images/large/${img.filename}` : null);
      const thumb = img.thumbUrl || img.imageUrl || (img.image && typeof img.image === 'object' ? img.image.url : null) || src;

      if (!src) continue;
      const normalizedSrc = src.split('?')[0];
      if (seenSrcs.has(normalizedSrc)) continue;
      seenSrcs.add(normalizedSrc);

      const albumTitle = img.album && typeof img.album === 'object'
        ? img.album.title
        : (img.project || null);

      const categoryName = img.category && typeof img.category === 'object'
        ? img.category.name
        : null;

      if (albumTitle) albumSet.add(albumTitle);
      if (categoryName) categorySet.add(categoryName);

      imagesList.push({
        id: String(img.id),
        payloadId: img.id,
        title: img.title || img.filename || 'Gallery Photo',
        filename: img.filename || null,
        src,
        thumb: thumb || src,
        album: albumTitle,
        category: categoryName,
        source: 'payload',
      });
    }

    // Add static fallback photos from curated projects (Eddie the Trooper, Darth Vader, etc.)
    const staticSets = [
      ...eddieTheTrooperPhotos.map((p) => ({ ...p, album: 'Eddie the Trooper', category: '3D Prints' })),
      ...darthVaderDioramaPhotos.map((p) => ({ ...p, album: 'Darth Vader Diorama', category: '3D Prints' })),
      ...leatherfacePhotos.map((p) => ({ ...p, album: 'The Butcher Bust', category: '3D Prints' })),
      ...house3DPhotos.map((p) => ({ ...p, album: '3D House Project', category: 'Digital Models' })),
      ...fallbackPhotos.map((p) => ({ ...p, album: 'Summer 2026', category: 'Photography' })),
    ];

    for (const p of staticSets) {
      const src = p.src;
      if (!src) continue;
      const normalizedSrc = src.split('?')[0];
      if (seenSrcs.has(normalizedSrc)) continue;
      seenSrcs.add(normalizedSrc);

      if (p.album) albumSet.add(p.album);
      if (p.category) categorySet.add(p.category);

      imagesList.push({
        id: p.id || p.filename?.replace(/\.[^/.]+$/, '') || normalizedSrc,
        payloadId: null,
        title: p.title || p.filename || 'Gallery Photo',
        filename: p.filename || null,
        src,
        thumb: p.thumb || src,
        album: p.album || null,
        category: p.category || null,
        source: 'static',
      });
    }

    // Include fallback album names
    for (const alb of fallbackAlbums) {
      if (alb.title) albumSet.add(alb.title);
    }
    for (const alb of dbAlbums) {
      if (alb.title) albumSet.add(alb.title);
    }

    return NextResponse.json({
      status: 'ok',
      total: imagesList.length,
      images: imagesList,
      albums: Array.from(albumSet),
      categories: Array.from(categorySet),
    });
  } catch (err) {
    console.error('[Workbench Gallery] Error fetching gallery items:', err);
    return NextResponse.json({ error: 'Failed to retrieve gallery items.' }, { status: 500 });
  }
}
