import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image for screen readers.' },
    },
  ],
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'application/pdf'],
  },
}
