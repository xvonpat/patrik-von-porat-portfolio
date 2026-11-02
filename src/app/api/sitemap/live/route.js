import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminAuth } from '@/lib/workbench/auth';

export async function GET(req) {
  const { authorized, payload, error } = await verifyAdminAuth(req);
  if (!authorized) {
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 });
  }

  // 1. Filesystem scan of src/app/(app)
  const scannedRoutes = [];
  try {
    const baseDir = path.join(process.cwd(), 'src', 'app', '(app)');

    function scanDir(dir, relPath = '') {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          // Skip private or route-group folders if needed, but in (app) all subdirectories are paths
          scanDir(path.join(dir, entry.name), path.join(relPath, entry.name));
        } else if (entry.isFile() && /^page\.(js|jsx|ts|tsx)$/.test(entry.name)) {
          const routePath = relPath ? '/' + relPath.replace(/\\/g, '/') : '/';
          scannedRoutes.push({
            route: routePath,
            file: path.join('src', 'app', '(app)', relPath, entry.name).replace(/\\/g, '/'),
          });
        }
      }
    }

    if (fs.existsSync(baseDir)) {
      scanDir(baseDir);
    }
  } catch (err) {
    console.warn('[Sitemap Live] Could not scan filesystem:', err?.message);
  }

  // 2. Query published posts from Payload CMS
  let publishedPosts = [];
  try {
    const postsRes = await payload.find({
      collection: 'posts',
      where: {
        _status: { equals: 'published' },
      },
      limit: 50,
      sort: '-publishedAt',
    });
    publishedPosts = (postsRes?.docs || []).map((p) => ({
      id: p.id,
      title: p.title || 'Untitled Post',
      slug: p.slug,
      path: `/blog/${p.slug}`,
      publishedAt: p.publishedAt,
    }));
  } catch (err) {
    console.warn('[Sitemap Live] Could not query published posts:', err?.message);
  }

  // 3. Query gallery albums from Payload CMS
  let galleryAlbums = [];
  try {
    const albumsRes = await payload.find({
      collection: 'gallery-albums',
      limit: 50,
    });
    galleryAlbums = (albumsRes?.docs || []).map((a) => ({
      id: a.id,
      title: a.title || 'Untitled Album',
      slug: a.slug,
    }));
  } catch (err) {
    console.warn('[Sitemap Live] Could not query gallery albums:', err?.message);
  }

  // 4. Extract registered collections and globals
  const collections = (payload?.config?.collections || []).map((c) => ({
    slug: c.slug,
    labels: c.labels,
    upload: Boolean(c.upload),
  }));

  const globals = (payload?.config?.globals || []).map((g) => ({
    slug: g.slug,
    label: g.label || g.slug,
  }));

  return NextResponse.json({
    status: 'ok',
    scannedRoutes,
    publishedPosts,
    galleryAlbums,
    collections,
    globals,
    timestamp: new Date().toISOString(),
  });
}
