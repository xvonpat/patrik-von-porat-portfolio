import type { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'accent', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data) {
          if (data.name && (!data.slug || typeof data.slug !== 'string' || data.slug.trim() === '')) {
            data.slug = data.name
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .trim()
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-');
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
      admin: {
        description: 'Display name for this category (e.g., Music, Visual Art, Making).',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly identifier (e.g., music, visual-art). Auto-generated from name if left empty.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Short editorial description for this topic area (optional).',
      },
    },
    {
      name: 'accent',
      type: 'select',
      label: 'Theme Accent',
      defaultValue: 'purple',
      options: [
        { label: 'Purple (Creative / Art / Music / Personal)', value: 'purple' },
        { label: 'Cyan (Systems / Tech / Process)', value: 'cyan' },
      ],
      admin: {
        description: 'Visual accent color in the journal filters and post badges.',
      },
    },
  ],
};
