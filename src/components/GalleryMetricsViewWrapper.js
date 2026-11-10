import React from 'react';
import { DefaultTemplate } from '@payloadcms/next/templates';
import { SetStepNav } from '@payloadcms/ui';
import manifest from '../data/gallery-file-manifest.json';
import { GalleryMetricsView } from './GalleryMetricsView.js';

const relId = (value) => (value && typeof value === 'object' ? String(value.id) : value != null ? String(value) : null);

const formatOf = (name) => {
  const ext = (name || '').split('.').pop();
  return ext && ext !== name ? ext.toUpperCase().replace('JPEG', 'JPG') : 'UNKNOWN';
};

async function buildMetricsData(payload) {
  const [imagesRes, albumsRes, categoriesRes] = await Promise.all([
    payload.find({ collection: 'gallery-images', limit: 2000, depth: 1, pagination: false }),
    payload.find({ collection: 'gallery-albums', limit: 500, depth: 0, pagination: false }),
    payload.find({ collection: 'gallery-categories', limit: 500, depth: 0, pagination: false }),
  ]);

  const albums = new Map((albumsRes.docs || []).map((a) => [String(a.id), a]));
  const categories = new Map((categoriesRes.docs || []).map((c) => [String(c.id), c]));
  const files = manifest.files || {};
  const history = manifest.filenameHistory || {};

  const rows = (imagesRes.docs || []).map((img) => {
    const album = albums.get(relId(img.album));
    const category = categories.get(relId(img.category));
    const media = img.image && typeof img.image === 'object' ? img.image : null;

    const imagePath = img.imageUrl || media?.url || null;
    const thumbPath = img.thumbUrl && img.thumbUrl !== img.imageUrl ? img.thumbUrl : null;

    const imageBytes = imagePath && files[imagePath] != null ? files[imagePath] : media?.filesize ?? null;
    const thumbBytes = thumbPath && files[thumbPath] != null ? files[thumbPath] : null;
    const filename = img.filename || media?.filename || (imagePath ? imagePath.split('/').pop() : '');

    return {
      id: String(img.id),
      group: album?.title || category?.name || 'Unassigned',
      category: category?.name || 'Unassigned',
      album: album?.title || null,
      order: Number(img.order) || 0,
      title: img.title || filename,
      filename,
      previousFilename: (imagePath && history[imagePath]) || history[filename] || null,
      format: formatOf(filename),
      width: img.width || media?.width || null,
      height: img.height || media?.height || null,
      status: img.status || 'published',
      imagePath,
      thumbPath,
      imageBytes,
      thumbBytes,
      totalBytes: (imageBytes || 0) + (thumbBytes || 0),
      missingFile: imagePath ? imageBytes == null : true,
    };
  });

  rows.sort((a, b) => a.category.localeCompare(b.category) || a.group.localeCompare(b.group) || a.order - b.order);

  return { rows, generatedAt: manifest.generatedAt || null };
}

export async function GalleryMetricsViewWrapper(props) {
  const { initPageResult, params, searchParams, payload, i18n } = props || {};
  const req = initPageResult?.req;
  const resolvedPayload = payload || req?.payload;
  const resolvedI18n = i18n || req?.i18n;
  const user = req?.user;

  const rawVisibleEntities = initPageResult?.visibleEntities;
  const visibleEntities = {
    collections: rawVisibleEntities?.collections || {},
    globals: rawVisibleEntities?.globals || {},
  };

  let content;
  if (!user) {
    content = <p style={{ padding: '2rem', color: '#94a3b8' }}>Please log in to view gallery metrics.</p>;
  } else {
    let data = null;
    let loadError = null;
    try {
      data = await buildMetricsData(resolvedPayload);
    } catch (error) {
      loadError = String(error?.message || error);
    }
    content = data ? (
      <GalleryMetricsView rows={data.rows} generatedAt={data.generatedAt} />
    ) : (
      <p style={{ padding: '2rem', color: '#fca5a5' }}>Could not load gallery metrics: {loadError}</p>
    );
  }

  if (!resolvedPayload) return content;

  return (
    <DefaultTemplate
      i18n={resolvedI18n}
      locale={initPageResult?.locale}
      params={params}
      payload={resolvedPayload}
      permissions={initPageResult?.permissions}
      req={req}
      searchParams={searchParams}
      user={user}
      visibleEntities={visibleEntities}
      viewType="custom"
    >
      <SetStepNav nav={[{ label: 'Gallery Storage Metrics' }]} />
      {content}
    </DefaultTemplate>
  );
}

export default GalleryMetricsViewWrapper;
