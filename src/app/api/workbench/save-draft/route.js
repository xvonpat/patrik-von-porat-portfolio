import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/workbench/auth';
import { markdownToLexical } from '@/lib/workbench/lexicalHelper';

const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_BUFFER_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req) {
  // 1. Independent authentication & authorization check
  const { authorized, payload, error } = await verifyAdminAuth(req);
  if (!authorized) {
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 });
  }

  // 2. Request body parsing
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 });
  }

  const {
    title,
    excerpt = '',
    contentMarkdown = '',
    category = null,
    tags = [],
    seoTitle = '',
    metaDescription = '',
    attachImage = false,
    image = null,
    imageAlt = '',
  } = body;

  // 3. Validate post title
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return NextResponse.json({ error: 'Post title is required to save a draft.' }, { status: 400 });
  }

  const cleanTitle = title.trim();

  // 4. Generate guaranteed unique slug so we NEVER overwrite existing documents
  let baseSlug = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  if (!baseSlug) {
    baseSlug = `workbench-draft-${Date.now()}`;
  }

  let uniqueSlug = baseSlug;
  try {
    const existing = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: uniqueSlug,
        },
      },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }
  } catch {
    uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
  }

  // 5. Resolve Category relationship ID if provided
  let categoryId = null;
  if (category) {
    try {
      if (typeof category === 'number' || (typeof category === 'string' && /^\d+$/.test(category))) {
        categoryId = Number(category);
      } else {
        const catSlug = String(category).toLowerCase().replace(/\s+/g, '-');
        const found = await payload.find({
          collection: 'categories',
          where: {
            or: [
              { slug: { equals: catSlug } },
              { name: { equals: category } },
            ],
          },
          limit: 1,
        });
        if (found.docs.length > 0) {
          categoryId = found.docs[0].id;
        }
      }
    } catch (catErr) {
      console.warn('[Workbench SaveDraft] Could not resolve category:', catErr?.message);
    }
  }

  // 6. Handle Media Upload only if explicitly requested to attach to content
  let featuredImageId = null;
  if (attachImage && typeof image === 'string' && image.startsWith('data:image/')) {
    try {
      const match = image.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (match) {
        const rawMime = match[1].toLowerCase();
        const base64Data = match[2];

        if (ALLOWED_IMAGE_MIME_TYPES.includes(rawMime)) {
          const buffer = Buffer.from(base64Data, 'base64');

          if (buffer.length <= MAX_IMAGE_BUFFER_SIZE) {
            const extMap = {
              'image/jpeg': 'jpg',
              'image/jpg': 'jpg',
              'image/png': 'png',
              'image/webp': 'webp',
              'image/gif': 'gif',
            };
            const ext = extMap[rawMime] || 'jpg';
            const filename = `workbench-${Date.now()}.${ext}`;

            const mediaDoc = await payload.create({
              collection: 'media',
              data: {
                alt: imageAlt.trim() || cleanTitle,
              },
              file: {
                data: buffer,
                mimetype: rawMime,
                name: filename,
                size: buffer.length,
              },
            });

            if (mediaDoc?.id) {
              featuredImageId = mediaDoc.id;
            }
          } else {
            console.warn('[Workbench SaveDraft] Image buffer exceeds 10MB limit, skipping attachment.');
          }
        }
      }
    } catch (mediaErr) {
      console.error('[Workbench SaveDraft] Failed to create media document:', mediaErr);
      // We continue saving the draft even if media upload fails
    }
  }

  // 7. Convert Markdown content to Payload Lexical AST
  const lexicalContent = markdownToLexical(contentMarkdown);

  // 8. Format tags array
  const formattedTags = Array.isArray(tags)
    ? tags
        .filter((t) => typeof t === 'string' && t.trim() !== '')
        .map((t) => ({ tag: t.trim() }))
    : [];

  // 9. Create the post in Payload CMS with status 'draft'
  // CRITICAL SECURITY RULE: status is always strictly 'draft'.
  // This project uses status ('draft' | 'published') for publication control.
  // Draft posts are filtered out of all public routes (blog, home, sitemap, slug).
  try {
    const newPost = await payload.create({
      collection: 'posts',
      data: {
        title: cleanTitle,
        slug: uniqueSlug,
        excerpt: excerpt.trim() || undefined,
        content: lexicalContent,
        category: categoryId || undefined,
        tags: formattedTags,
        status: 'draft', // Strictly 'draft'. Never published automatically.
        featuredImage: featuredImageId || undefined,
        seo: {
          seoTitle: seoTitle.trim() || cleanTitle,
          metaDescription: metaDescription.trim() || excerpt.trim() || undefined,
          canonicalUrl: `https://vonporat.com/blog/${uniqueSlug}`,
        },
      },
    });

    return NextResponse.json({
      status: 'ok',
      message: 'Draft post created successfully',
      post: {
        id: newPost.id,
        title: newPost.title,
        slug: newPost.slug,
        status: newPost.status,
        hasFeaturedImage: Boolean(featuredImageId),
        editUrl: `/admin/collections/posts/${newPost.id}`,
        previewUrl: `/api/preview?slug=${encodeURIComponent(newPost.slug)}`,
      },
    });
  } catch (err) {
    console.error('[Workbench SaveDraft] Failed to create draft post in database:', err);
    return NextResponse.json(
      { error: `Database error while saving draft: ${err?.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}
