import type { GlobalConfig } from 'payload'

import { authenticated } from '../access'
import { revalidateGlobal } from '../hooks/revalidateSite'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'siteTitle', type: 'text', required: true, defaultValue: 'Portfolio' },
    { name: 'description', type: 'textarea', required: true },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    {
      name: 'sections',
      type: 'group',
      fields: [
        { name: 'projectsTitle', type: 'text', defaultValue: 'Some Of My Featured Projects' },
        { name: 'storyTitle', type: 'text', defaultValue: 'My Story' },
        { name: 'servicesTitle', type: 'text', defaultValue: 'What Can I Build For You?' },
        { name: 'blogTitle', type: 'text', defaultValue: 'Latest Writing' },
      ],
    },
    { name: 'footerText', type: 'text' },
  ],
}
