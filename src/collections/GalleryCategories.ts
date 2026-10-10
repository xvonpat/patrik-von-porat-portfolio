import type { CollectionConfig } from 'payload';

export const GalleryCategories: CollectionConfig = {
  slug: 'gallery-categories',
  labels: {
    singular: 'Gallery Category',
    plural: 'Gallery Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', 'eyebrow', 'status', 'updatedAt'],
    group: 'Gallery',
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
        description: 'Display name for this collection (e.g., Summer 2026, 3D Prints, Graphite, Charcoal).',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL identifier (e.g., summer-2026, 3d-prints). Auto-generated from name if left empty.',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        description: 'Numerical sort order in the gallery category selector (lower numbers appear first).',
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Tag',
      admin: {
        description: 'Optional small label above heading (e.g., "Adobe Lightroom Collection" or "Physical Models").',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description / Subtitle',
      admin: {
        description: 'Optional descriptive note shown beneath the collection heading.',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Publish Status',
      defaultValue: 'published',
      required: true,
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      admin: {
        description: 'Draft categories are hidden from the public gallery.',
      },
    },
  ],
};
