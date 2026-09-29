import type { GlobalConfig } from 'payload'

import { authenticated } from '../access'
import { urlField } from '../fields/url'
import { revalidateGlobal } from '../hooks/revalidateSite'

export const socialPlatforms = [
  { label: 'GitHub', value: 'github' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'X (Twitter)', value: 'x' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'DEV (dev.to)', value: 'devto' },
  { label: 'Website', value: 'website' },
] as const

export const Profile: GlobalConfig = {
  slug: 'profile',
  access: { read: () => true, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'role', type: 'text', required: true },
              ],
            },
            { name: 'location', type: 'text' },
            {
              type: 'row',
              fields: [
                { name: 'available', type: 'checkbox', defaultValue: true },
                { name: 'availabilityLabel', type: 'text', defaultValue: 'Available for work' },
              ],
            },
            { name: 'headline', type: 'textarea', required: true },
            { name: 'intro', type: 'textarea', required: true },
            { name: 'portrait', type: 'upload', relationTo: 'media' },
            {
              name: 'marquee',
              type: 'text',
              hasMany: true,
              admin: { description: 'Scrolling strip under the hero (tech stack, clients, …).' },
            },
          ],
        },
        {
          label: 'Story',
          fields: [
            {
              name: 'story',
              type: 'richText',
              admin: {
                description:
                  'Bold text is shown in full colour; the rest is muted, as in the design.',
              },
            },
            { name: 'storyPhotos', type: 'upload', relationTo: 'media', hasMany: true, maxRows: 2 },
            { name: 'resume', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'email', type: 'email', required: true },
            urlField({
              name: 'bookingUrl',
              label: 'Booking URL',
              admin: {
                description: 'Calendly/Cal.com link for "Book a call". Falls back to email.',
              },
            }),
            {
              name: 'contactHeading',
              type: 'textarea',
              defaultValue: 'Your Vision, My Code\nLet’s Bring It To Life',
            },
            { name: 'contactBody', type: 'textarea' },
            {
              name: 'socials',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: socialPlatforms.map((p) => ({ ...p })),
                    },
                    urlField({ name: 'url', required: true }),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
