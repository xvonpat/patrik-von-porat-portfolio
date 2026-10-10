import type { CollectionConfig } from 'payload';

export const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  labels: {
    singular: 'Gallery Image',
    plural: 'Gallery Images',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['thumbnail', 'title', 'category', 'album', 'orientation', 'order', 'status'],
    group: 'Gallery',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'thumbnail',
      type: 'ui',
      label: 'Thumbnail',
      admin: {
        components: {
          Cell: '/src/components/GalleryThumbnailCell.js',
          Field: '/src/components/GalleryThumbnailField.js',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Image Title / Label',
      admin: {
        description: 'Display title or identifier (e.g. "IMG_1552" or "Eddie the Trooper - Final Print").',
      },
    },
    {
      name: 'filename',
      type: 'text',
      label: 'Original Filename',
      admin: {
        description: 'Original file identifier (e.g. "IMG_1552.jpg").',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Uploaded Media Asset',
      admin: {
        description: 'Upload or choose an image from the Payload Media library.',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Direct Image URL / Path',
      admin: {
        description: 'Optional path to static image asset (e.g. "/images/gallery/images/large/IMG_1552.jpg").',
      },
    },
    {
      name: 'thumbUrl',
      type: 'text',
      label: 'Direct Thumbnail URL / Path',
      admin: {
        components: {
          Cell: '/src/components/GalleryThumbnailCell.js',
        },
        description: 'Optional path to static thumbnail asset (e.g. "/images/gallery/images/thumbnails/IMG_1552.jpg").',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'gallery-categories',
      hasMany: false,
      label: 'Gallery Category',
      admin: {
        description: 'Assign this image to a specific collection (e.g., Summer 2026, 3D Prints, Graphite).',
      },
    },
    {
      name: 'album',
      type: 'relationship',
      relationTo: 'gallery-albums',
      hasMany: false,
      label: 'Gallery Album',
      filterOptions: ({ data }) => {
        if (!data?.category) return true;
        const catId = typeof data.category === 'object' ? (data.category as any)?.id : data.category;
        if (!catId) return true;
        return {
          collection: {
            equals: catId,
          },
        };
      },
      admin: {
        description: 'Optional album within the assigned collection (e.g., "Eddie the Trooper" under "3D Prints").',
      },
      validate: async (value, { data, req }: any) => {
        if (!value) return true;
        const categoryVal = (data as any)?.category;
        if (!categoryVal) {
          return 'Please select a Gallery Category before assigning an album.';
        }
        const albumId = typeof value === 'object' ? (value as any)?.id : value;
        const catId = typeof categoryVal === 'object' ? (categoryVal as any)?.id : categoryVal;
        try {
          if (req?.payload && albumId) {
            const albumDoc: any = await req.payload.findByID({
              collection: 'gallery-albums',
              id: albumId,
              depth: 0,
            });
            if (albumDoc) {
              const albumCatId = typeof albumDoc.collection === 'object' ? albumDoc.collection.id : albumDoc.collection;
              if (String(albumCatId) !== String(catId)) {
                return 'The selected album does not belong to the chosen category.';
              }
            }
          }
        } catch {
          // If relationship check query fails, permit save
        }
        return true;
      },
    },
    {
      name: 'project',
      type: 'text',
      label: 'Project Grouping (Optional)',
      admin: {
        description: 'Optional project or subject name for grouping (e.g., "Eddie the Trooper").',
      },
    },
    {
      name: 'orientation',
      type: 'select',
      label: 'Orientation',
      defaultValue: 'landscape',
      required: true,
      options: [
        { label: 'Landscape', value: 'landscape' },
        { label: 'Portrait', value: 'portrait' },
      ],
      admin: {
        description: 'Used for gallery orientation filtering (All / Landscape / Portrait).',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order / Sequence',
      defaultValue: 0,
      admin: {
        description: 'Numerical sort sequence within its collection (lower numbers appear first).',
      },
    },
    {
      name: 'width',
      type: 'number',
      label: 'Width (px)',
      defaultValue: 1200,
    },
    {
      name: 'height',
      type: 'number',
      label: 'Height (px)',
      defaultValue: 800,
    },
    {
      name: 'aspectRatio',
      type: 'text',
      label: 'Aspect Ratio',
      defaultValue: '3/2',
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
        description: 'Draft images are hidden from public gallery views.',
      },
    },
  ],
};
