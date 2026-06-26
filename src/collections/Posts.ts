import type { CollectionConfig } from 'payload';

function extractFirstParagraph(content: any): string {
  if (!content || !content.root || !Array.isArray(content.root.children)) {
    return '';
  }

  for (const child of content.root.children) {
    if (child.type === 'paragraph' && Array.isArray(child.children)) {
      const text = child.children
        .filter((c: any) => c.type === 'text')
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
  if (!node) return '';
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
      ({ data }) => {
        if (data) {
          // 1. Slug auto-generation from title if empty
          if (data.title && (!data.slug || data.slug.trim() === '')) {
            data.slug = data.title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '') // remove special characters except spaces/hyphens
              .trim()
              .replace(/\s+/g, '-')       // spaces to hyphens
              .replace(/-+/g, '-');        // duplicate hyphens to single
          }

          // 2. Excerpt auto-generation from content if empty
          if (data.content && (!data.excerpt || data.excerpt.trim() === '')) {
            const firstParagraph = extractFirstParagraph(data.content);
            if (firstParagraph) {
              data.excerpt = truncateText(firstParagraph, 150);
            }
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
        if (data?.status === 'published' && (!val || val.trim() === '')) {
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
      required: true,
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
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      admin: {
        position: 'sidebar',
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
        description: 'Drafts can be saved incomplete. Published posts require slug, excerpt, content, and date.',
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
        if (data?.status === 'published' && (!val || val.trim() === '')) {
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
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph Image',
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          label: 'Canonical URL',
        },
      ],
    },
  ],
};
