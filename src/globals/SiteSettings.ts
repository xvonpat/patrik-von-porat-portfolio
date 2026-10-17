import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'System',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'homepageBackground',
      label: 'Homepage Background Theme',
      type: 'select',
      defaultValue: 'harmonic-nexus',
      required: true,
      options: [
        {
          label: 'Harmonic Nexus (3D Cymatic Strings & Attractor Field — Signature)',
          value: 'harmonic-nexus',
        },
        {
          label: 'Digital Eclipse II (Atmospheric Corona — Particle Data Ring)',
          value: 'digital-eclipse-v2',
        },
        {
          label: 'Digital Eclipse (Radial Corona & Cosmic Filaments)',
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
