import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access'
import { slugField } from '../fields/slug'
import { statusField } from '../fields/status'
import { urlField } from '../fields/url'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite'

export const projectTints = ['blue', 'violet', 'green', 'amber', 'rose'] as const

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'featured', 'status', 'order'],
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
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 240,
      admin: { description: 'One or two sentences shown on the project card.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'year', type: 'number', required: true, min: 2000, max: 2100 },
        {
          name: 'category',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "AI, Backend & Web App"' },
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      maxRows: 2,
      admin: { description: 'Two short facts shown on the card (value + explanation).' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'stack',
      type: 'text',
      hasMany: true,
      admin: { description: 'Technologies used, one per entry.' },
    },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'description', type: 'richText' },
    {
      type: 'row',
      fields: [
        urlField({ name: 'repoUrl', label: 'Repository URL' }),
        urlField({
          name: 'liveUrl',
          label: 'Live URL',
          admin: {
            description: 'Optional. When set, a "Live preview" button appears on the project.',
          },
        }),
      ],
    },
    {
      name: 'tint',
      type: 'select',
      defaultValue: 'blue',
      options: projectTints.map((value) => ({ label: value, value })),
      admin: { position: 'sidebar', description: 'Card colour in the featured stack.' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
    statusField,
  ],
}
