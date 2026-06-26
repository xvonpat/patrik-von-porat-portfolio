import type { CollectionConfig } from 'payload';

function extractFirstParagraph(content: any): string {
  if (!content || typeof content !== 'object' || !content.root || !Array.isArray(content.root.children)) {
    return '';
  }

  for (const child of content.root.children) {
    if (child && typeof child === 'object' && child.type === 'paragraph' && Array.isArray(child.children)) {
      const text = child.children
        .filter((c: any) => c && typeof c === 'object' && c.type === 'text')
        .map((c: any) => c.text || '')
        .join('')
        .trim();
      if (text) return text;
    }
  }
  return '';
}

function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  const truncated = text.slice(0, length).trim();
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > length * 0.7) {
    return truncated.slice(0, lastSpace) + '...';
  }
  return truncated + '...';
}

function getLexicalText(node: any): string {
  if (!node || typeof node !== 'object') return '';
  if (Array.isArray(node)) {
    return node.map(getLexicalText).join(' ');
  }
  if (node.type === 'text') {
    return node.text || '';
  }
  if (node.children) {
    return getLexicalText(node.children);
  }
  return '';
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'slug', 'publishedDate'],
  },
  hooks: {
    beforeValidate: [
      ({ data, originalDoc }: any) => {
        if (data) {
          // 1. Slug auto-generation from title if empty
          if (data.title && (!data.slug || typeof data.slug !== 'string' || data.slug.trim() === '')) {
            data.slug = data.title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '') // remove special characters except spaces/hyphens
              .trim()
              .replace(/\s+/g, '-')       // spaces to hyphens
              .replace(/-+/g, '-');        // duplicate hyphens to single
          }

          // 2. Excerpt auto-generation from content if empty
          if (data.content && (!data.excerpt || typeof data.excerpt !== 'string' || data.excerpt.trim() === '')) {
            const firstParagraph = extractFirstParagraph(data.content);
            if (firstParagraph) {
              data.excerpt = truncateText(firstParagraph, 150);
            }
          }

          // Initialize data.seo if it doesn't exist
          if (!data.seo || typeof data.seo !== 'object') {
            data.seo = {};
          }

          const getRelationId = (val: any) => {
            if (val && typeof val === 'object') {
              return val.id !== undefined ? val.id : val;
            }
            return val;
          };

          const resolvedTitle = data.title || originalDoc?.title;
          const resolvedSlug = data.slug || originalDoc?.slug;
          const resolvedExcerpt = data.excerpt || originalDoc?.excerpt;
          const resolvedContent = data.content || originalDoc?.content;
          const resolvedFeaturedImage = getRelationId(data.featuredImage || originalDoc?.featuredImage);

          const resolvedSeo = {
            ...(originalDoc?.seo || {}),
            ...(data.seo || {}),
          };

          // 3. SEO Title: If SEO Title is empty, use the post title as default.
          if (!resolvedSeo.seoTitle || typeof resolvedSeo.seoTitle !== 'string' || resolvedSeo.seoTitle.trim() === '') {
            if (resolvedTitle) {
              resolvedSeo.seoTitle = resolvedTitle;
            }
          }

          // 4. Meta Description: If Meta Description is empty, use the excerpt.
          // If excerpt is empty, generate it from the first meaningful paragraph of the post body.
          // Limit to around 150–160 characters.
          if (!resolvedSeo.metaDescription || typeof resolvedSeo.metaDescription !== 'string' || resolvedSeo.metaDescription.trim() === '') {
            if (resolvedExcerpt) {
              resolvedSeo.metaDescription = truncateText(resolvedExcerpt, 150);
            } else if (resolvedContent) {
              const firstParagraph = extractFirstParagraph(resolvedContent);
              if (firstParagraph) {
                resolvedSeo.metaDescription = truncateText(firstParagraph, 150);
              }
            }
          }

          // 5. Open Graph Image: If Open Graph Image is empty, use the post featured image as default.
          // If no featured image exists, leave it empty.
          if (!resolvedSeo.ogImage) {
            if (resolvedFeaturedImage) {
              resolvedSeo.ogImage = resolvedFeaturedImage;
            }
          } else {
            resolvedSeo.ogImage = getRelationId(resolvedSeo.ogImage);
          }

          // 6. Canonical URL: If Canonical URL is empty and slug exists, generate: https://vonporat.com/blog/[slug]
          if (!resolvedSeo.canonicalUrl || typeof resolvedSeo.canonicalUrl !== 'string' || resolvedSeo.canonicalUrl.trim() === '') {
            if (resolvedSlug) {
              resolvedSeo.canonicalUrl = `https://vonporat.com/blog/${resolvedSlug}`;
            }
          }

          data.seo = resolvedSeo;

          // 7. Published Date auto-generation: If status is published and date is empty, set to current time
          const resolvedStatus = data.status || originalDoc?.status;
          if (resolvedStatus === 'published') {
            const currentPublishedDate = data.publishedDate || originalDoc?.publishedDate;
            if (!currentPublishedDate) {
              data.publishedDate = new Date().toISOString();
            }
          }

          // 8. Category default fallback: If category is empty, default to behind-the-scenes
          if (!data.category && !originalDoc?.category) {
            data.category = 'behind-the-scenes';
          }

          // 9. Tags auto-suggestion: If tags array is empty, generate from content keywords
          const rawTags = data.tags || originalDoc?.tags;
          const existingTags: string[] = [];
          if (Array.isArray(rawTags)) {
            for (const item of rawTags) {
              if (item && typeof item === 'object' && typeof item.tag === 'string') {
                const trimmed = item.tag.trim();
                if (trimmed && !existingTags.includes(trimmed)) {
                  existingTags.push(trimmed);
                }
              }
            }
          }

          if (existingTags.length === 0) {
            const resolvedTitleText = (resolvedTitle || '').toLowerCase();
            const resolvedExcerptText = (resolvedExcerpt || '').toLowerCase();
            const resolvedCategoryText = (data.category || originalDoc?.category || '').toLowerCase();
            const resolvedBodyText = resolvedContent ? getLexicalText(resolvedContent).toLowerCase() : '';

            const combinedText = `${resolvedTitleText} ${resolvedExcerptText} ${resolvedCategoryText} ${resolvedBodyText}`;

            const tagSuggestions = [
              { name: 'Ashwrithe', keywords: ['ashwrithe'] },
              { name: 'Realmforged', keywords: ['realmforged'] },
              { name: 'Logo Design', keywords: ['logo', 'design'] },
              { name: 'Adobe Illustrator', keywords: ['illustrator', 'adobe'] },
              { name: 'Vector Art', keywords: ['vector'] },
              { name: 'Music', keywords: ['music', 'guitar', 'metal'] },
              { name: 'AI Art', keywords: ['ai art', 'midjourney', 'generative ai'] },
              { name: 'Lean Six Sigma', keywords: ['six sigma', 'lean', 'six-sigma'] },
              { name: 'Behind the Scenes', keywords: ['behind the scenes', 'behind-the-scenes', 'making of'] },
              { name: 'Creative Process', keywords: ['creative process', 'concept art', 'workflow'] },
            ];

            const suggestedNames: string[] = [];
            for (const suggestion of tagSuggestions) {
              const hasKeyword = suggestion.keywords.some((keyword) => combinedText.includes(keyword.toLowerCase()));
              if (hasKeyword && !suggestedNames.includes(suggestion.name)) {
                suggestedNames.push(suggestion.name);
              }
            }

            // Fallback default tag based on category if still empty
            if (suggestedNames.length === 0) {
              const category = data.category || originalDoc?.category;
              if (category === 'music') suggestedNames.push('Music');
              else if (category === 'art') suggestedNames.push('Vector Art');
              else if (category === 'ai') suggestedNames.push('AI Art');
              else if (category === 'process-improvement') suggestedNames.push('Lean Six Sigma');
              else if (category === 'behind-the-scenes') suggestedNames.push('Behind the Scenes');
              else if (category === 'website-build-log') suggestedNames.push('Creative Process');
            }

            data.tags = suggestedNames.map((t) => ({ tag: t }));
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      validate: (val: any, { data }: { data?: any }) => {
        if (data?.status === 'published' && (!val || typeof val !== 'string' || val.trim() === '')) {
          return 'A slug is required when the post is published.';
        }
        return true;
      },
      admin: {
        position: 'sidebar',
        description: 'Slug is generated from the title if left empty.',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Music', value: 'music' },
        { label: 'Art', value: 'art' },
        { label: 'AI', value: 'ai' },
        { label: 'Process Improvement', value: 'process-improvement' },
        { label: 'Behind the Scenes', value: 'behind-the-scenes' },
        { label: 'Website / Build Log', value: 'website-build-log' },
      ],
      required: false,
      validate: (val: any, { data }: { data?: any }) => {
        if (data?.status === 'published' && (!val || typeof val !== 'string' || val.trim() === '')) {
          return 'A category is required when the post is published.';
        }
        return true;
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      validate: (val: any, { data }: { data?: any }) => {
        if (data?.status === 'published' && !val) {
          return 'A publication date is required when the post is published.';
        }
        return true;
      },
      admin: {
        position: 'sidebar',
        description: 'Published Date is set automatically when publishing if left empty.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      admin: {
        position: 'sidebar',
        description: 'Tags can be suggested automatically if left empty, but remain editable.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Drafts can be saved incomplete. Published posts require complete metadata (slug, category, date, excerpt, content, and SEO fields).',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Post',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      validate: (val: any, { data }: { data?: any }) => {
        if (data?.status === 'published' && (!val || typeof val !== 'string' || val.trim() === '')) {
          return 'An excerpt is required when the post is published.';
        }
        return true;
      },
      admin: {
        description: 'Excerpt is generated from the first paragraph if left empty.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      validate: (val: any, { data }: { data?: any }) => {
        if (data?.status === 'published') {
          if (!val) {
            return 'Content is required when the post is published.';
          }
          const text = getLexicalText(val);
          if (!text.trim()) {
            return 'Content is required when the post is published.';
          }
        }
        return true;
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'seoTitle',
          type: 'text',
          label: 'SEO Title',
          validate: (val: any, { data }: { data?: any }) => {
            if (data?.status === 'published' && (!val || typeof val !== 'string' || val.trim() === '')) {
              return 'SEO Title is required when the post is published.';
            }
            return true;
          },
          admin: {
            description: 'SEO Title defaults to the post title if left empty. Recommended max length: 50–60 characters.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          validate: (val: any, { data }: { data?: any }) => {
            if (data?.status === 'published' && (!val || typeof val !== 'string' || val.trim() === '')) {
              return 'Meta Description is required when the post is published.';
            }
            return true;
          },
          admin: {
            description: 'Meta Description defaults to the excerpt or first paragraph if left empty. Recommended max length: 150–160 characters.',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph Image',
          admin: {
            description: 'Open Graph Image defaults to the featured image if left empty.',
          },
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          label: 'Canonical URL',
          validate: (val: any, { data }: { data?: any }) => {
            if (data?.status === 'published' && (!val || typeof val !== 'string' || val.trim() === '')) {
              return 'Canonical URL is required when the post is published.';
            }
            return true;
          },
          admin: {
            description: 'Canonical URL defaults to the public blog URL (https://vonporat.com/blog/[slug]) if left empty.',
          },
        },
      ],
    },
  ],
};
