import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'homepageBackground',
      label: 'Homepage Background Theme',
      type: 'select',
      defaultValue: 'digital-eclipse',
      required: true,
      options: [
        {
          label: 'Digital Eclipse (Radial Corona & Cosmic Filaments — New)',
          value: 'digital-eclipse',
        },
        {
          label: 'Contour Flow (S-Valley River & Rolling Ridges — Option B)',
          value: 'contour-flow',
        },
        {
          label: 'Topographic Landscape (Alpine Peaks & Arêtes — Option A)',
          value: 'alpine-landscape',
        },
      ],
      admin: {
        description: 'Select the interactive 3D background theme displayed on the homepage hero.',
      },
    },
  ],
};
