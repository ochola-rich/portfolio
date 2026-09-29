import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access'
import { statusField } from '../fields/status'
import { urlField } from '../fields/url'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite'

// Posts are pointers to articles hosted elsewhere (see ADR-0004).
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'platform', 'publishedAt', 'status'],
  },
  defaultSort: '-publishedAt',
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
    { name: 'title', type: 'text', required: true },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 320,
      admin: { description: 'The snippet shown on the blog card.' },
    },
    urlField({
      name: 'externalUrl',
      label: 'Article URL',
      required: true,
      admin: { description: 'Where "Read more" goes, e.g. https://dev.to/you/your-post' },
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          defaultValue: 'devto',
          options: [
            { label: 'DEV (dev.to)', value: 'devto' },
            { label: 'Hashnode', value: 'hashnode' },
            { label: 'Medium', value: 'medium' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Other', value: 'other' },
          ],
        },
        { name: 'publishedAt', type: 'date', required: true },
        { name: 'readingTime', type: 'number', min: 1, admin: { description: 'Minutes' } },
      ],
    },
    { name: 'tags', type: 'text', hasMany: true },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    statusField,
  ],
}
