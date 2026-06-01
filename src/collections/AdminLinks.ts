import type { CollectionConfig } from 'payload';

export const AdminLinks: CollectionConfig = {
  slug: 'admin-links',
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'url', 'category', 'status', 'priority', 'sortOrder'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: {
        description: 'A descriptive name for this admin link (e.g., Vercel Dashboard).',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'URL',
      admin: {
        components: {
          Cell: '/src/components/ExternalLinkCell.js',
        },
        description: 'The full URL, including https:// (e.g., https://vercel.com).',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'Hosting & Deployment', value: 'hosting-deployment' },
        { label: 'Analytics & SEO', value: 'analytics-seo' },
        { label: 'CMS & Database', value: 'cms-database' },
        { label: 'Domains & DNS', value: 'domains-dns' },
        { label: 'Creative Platforms', value: 'creative-platforms' },
        { label: 'Music Platforms', value: 'music-platforms' },
        { label: 'Social Media', value: 'social-media' },
        { label: 'Tools', value: 'tools' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Choose the operational category for this tool.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional notes, usage instructions, or login details.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Occasional', value: 'occasional' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        description: 'Current status of this link or tool.',
      },
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
      admin: {
        description: 'Operational priority / importance for quick access.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Sort Order',
      admin: {
        description: 'Lower numbers will appear first in default sorting.',
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: true,
      label: 'Open in New Tab',
      admin: {
        description: 'When clicked in the admin panel, should the link open in a new tab?',
      },
    },
  ],
};
