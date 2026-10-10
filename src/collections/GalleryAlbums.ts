import type { CollectionConfig } from 'payload';

export const GalleryAlbums: CollectionConfig = {
  slug: 'gallery-albums',
  labels: {
    singular: 'Gallery Album',
    plural: 'Gallery Albums',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['thumbnail', 'title', 'slug', 'collection', 'order', 'status', 'updatedAt'],
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
          if (data.title && (!data.slug || typeof data.slug !== 'string' || data.slug.trim() === '')) {
            data.slug = data.title
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
      name: 'thumbnail',
      type: 'ui',
      label: 'Cover Thumbnail',
      admin: {
        components: {
          Cell: '/src/components/GalleryThumbnailCell.js',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Album Title',
      admin: {
        description: 'Display title of the project / album (e.g., "Eddie the Trooper").',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'Unique URL identifier (e.g., "eddie-the-trooper"). Auto-generated from title if empty.',
      },
    },
    {
      name: 'collection',
      type: 'relationship',
      relationTo: 'gallery-categories',
      required: true,
      hasMany: false,
      label: 'Parent Collection',
      admin: {
        description: 'Assign this album to a top-level collection (e.g., "3D Prints").',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image (Media Asset)',
      admin: {
        description: 'Optional cover image from the Media library. Falls back to first album image if omitted.',
      },
    },
    {
      name: 'coverUrl',
      type: 'text',
      label: 'Direct Cover Image URL / Path',
      admin: {
        description: 'Optional path or URL to cover thumbnail (e.g., "/images/art/eddie-the-trooper/thumbnails/IMG_0693.webp").',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description / Notes',
      admin: {
        description: 'Optional short description or project notes.',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        description: 'Display order within its parent collection (lower numbers appear first).',
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
        description: 'Draft albums are hidden from public gallery views.',
      },
    },
  ],
};
