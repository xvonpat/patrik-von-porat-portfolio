import fs from 'fs';
import path from 'path';

export interface WorkbenchImageInput {
  id?: string | number;
  payloadId?: string | number | null;
  title?: string;
  source?: 'upload' | 'gallery';
  dataUrl?: string;
  src?: string;
  thumb?: string;
  thumbUrl?: string;
  imageUrl?: string;
  url?: string;
  alt?: string;
}

export interface ResolvedOpenAiImage {
  id?: string | number;
  payloadId?: string | number | null;
  title?: string;
  source: 'upload' | 'gallery';
  openAiUrl: string;
  previewUrl: string;
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    default:
      return 'image/jpeg';
  }
}

/**
 * Resolves a local or remote image into a base64 data URL so OpenAI can reliably inspect it.
 */
async function resolveSingleImage(img: WorkbenchImageInput | string): Promise<ResolvedOpenAiImage | null> {
  // 1. Direct string data URL
  if (typeof img === 'string') {
    if (img.startsWith('data:image/')) {
      return {
        source: 'upload',
        openAiUrl: img,
        previewUrl: img,
      };
    }
    // String path or URL
    img = { src: img };
  }

  const source = img.source || (img.dataUrl ? 'upload' : 'gallery');

  // 2. Already has a dataUrl
  if (img.dataUrl && img.dataUrl.startsWith('data:image/')) {
    return {
      id: img.id,
      payloadId: img.payloadId,
      title: img.title || 'Uploaded image',
      source: 'upload',
      openAiUrl: img.dataUrl,
      previewUrl: img.dataUrl,
    };
  }

  // 3. Resolve path or URL
  const targetPath = img.thumbUrl || img.thumb || img.imageUrl || img.src || img.url;
  if (!targetPath || typeof targetPath !== 'string') {
    return null;
  }

  // Clean relative path (e.g. /images/art/...)
  const cleanPath = targetPath.split('?')[0];

  // If local static file in public directory
  if (cleanPath.startsWith('/')) {
    try {
      const fullDiskPath = path.join(process.cwd(), 'public', cleanPath.replace(/^\//, ''));
      if (fs.existsSync(fullDiskPath)) {
        const fileBuffer = await fs.promises.readFile(fullDiskPath);
        const mime = getMimeType(fullDiskPath);
        const base64Data = fileBuffer.toString('base64');
        const dataUrl = `data:${mime};base64,${base64Data}`;
        return {
          id: img.id,
          payloadId: img.payloadId,
          title: img.title || path.basename(cleanPath),
          source: 'gallery',
          openAiUrl: dataUrl,
          previewUrl: cleanPath,
        };
      }
    } catch (err) {
      console.warn(`[imageHelper] Could not read local file ${cleanPath}:`, err);
    }
  }

  // If absolute remote URL (e.g. S3 / Supabase / CDN)
  if (targetPath.startsWith('http://') || targetPath.startsWith('https://')) {
    try {
      // Try to fetch into base64 with a short timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(targetPath, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        const buf = Buffer.from(arrayBuf);
        const mime = res.headers.get('content-type') || getMimeType(targetPath);
        const dataUrl = `data:${mime};base64,${buf.toString('base64')}`;
        return {
          id: img.id,
          payloadId: img.payloadId,
          title: img.title || 'Gallery image',
          source: 'gallery',
          openAiUrl: dataUrl,
          previewUrl: targetPath,
        };
      }
    } catch {
      // Fallback: pass the public URL directly to OpenAI
      return {
        id: img.id,
        payloadId: img.payloadId,
        title: img.title || 'Gallery image',
        source: 'gallery',
        openAiUrl: targetPath,
        previewUrl: targetPath,
      };
    }
  }

  return null;
}

/**
 * Resolves multiple images from either an `images` array or a single `image` input.
 * Deduplicates and limits to a safe maximum (e.g. 6 images) to avoid payload overflow.
 */
export async function resolveWorkbenchImages(
  imagesInput: (WorkbenchImageInput | string)[] | null | undefined,
  singleImageInput?: WorkbenchImageInput | string | null,
  maxImages: number = 6
): Promise<ResolvedOpenAiImage[]> {
  const rawList: (WorkbenchImageInput | string)[] = [];

  if (Array.isArray(imagesInput)) {
    rawList.push(...imagesInput);
  }
  if (singleImageInput) {
    rawList.push(singleImageInput);
  }

  if (rawList.length === 0) {
    return [];
  }

  const resolved: ResolvedOpenAiImage[] = [];
  const seenUrls = new Set<string>();

  for (const item of rawList) {
    if (resolved.length >= maxImages) break;
    const res = await resolveSingleImage(item);
    if (res && !seenUrls.has(res.previewUrl)) {
      seenUrls.add(res.previewUrl);
      resolved.push(res);
    }
  }

  return resolved;
}
