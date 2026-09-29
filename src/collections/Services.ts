import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access'
import { statusField } from '../fields/status'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'order'],
  },
  defaultSort: 'order',
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Wrap words in *asterisks* to show them in the italic accent font.' },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: { description: 'Services with the same category share a tab.' },
    },
    { name: 'description', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'text',
          admin: { description: 'Optional, e.g. "$450" or "From $1,200". Hidden when empty.' },
        },
        { name: 'priceNote', type: 'text', admin: { description: 'e.g. "50% upfront"' } },
      ],
    },
    { name: 'features', type: 'text', hasMany: true },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: "Let's talk",
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    statusField,
  ],
}
