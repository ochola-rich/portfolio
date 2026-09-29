import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { slugify } from '../fields/slug'

import * as data from './data'

// Seeding runs outside Next.js, so skip the revalidation hooks.
const context = { disableRevalidate: true }

async function download(url: string, attempts = 4): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(url)
    // GitHub rate-limits preview images; back off and retry.
    if (response.status === 429 && attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 5000))
      continue
    }
    if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`)
    return response
  }
}

async function uploadFromUrl(payload: Payload, url: string, alt: string, filename: string) {
  const response = await download(url)
  const buffer = Buffer.from(await response.arrayBuffer())
  const mimetype = response.headers.get('content-type')?.split(';')[0] ?? 'image/png'
  const extension = mimetype.split('/')[1] ?? 'png'

  return payload.create({
    collection: 'media',
    data: { alt },
    file: { data: buffer, mimetype, name: `${filename}.${extension}`, size: buffer.length },
    context,
  })
}

async function exists(
  payload: Payload,
  collection: 'projects' | 'posts' | 'services',
  field: string,
  value: string,
) {
  const { totalDocs } = await payload.count({ collection, where: { [field]: { equals: value } } })
  return totalDocs > 0
}

async function seed() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'profile',
    data: {
      ...data.profile,
      marquee: [...data.profile.marquee],
      socials: data.profile.socials.map((s) => ({ ...s })),
    },
    context,
  })
  await payload.updateGlobal({ slug: 'site-settings', data: data.siteSettings, context })
  payload.logger.info('Seeded profile and site settings')

  for (const project of data.projects) {
    if (await exists(payload, 'projects', 'title', project.title)) continue
    // GitHub's generated social preview gives every project a real cover to start with.
    const repo = new URL(project.repoUrl).pathname
    const cover = await uploadFromUrl(
      payload,
      `https://opengraph.githubassets.com/seed${repo}`,
      `GitHub preview card for ${project.title}`,
      `${slugify(project.title)}-cover`,
    ).catch((error: Error) => {
      payload.logger.warn(`No cover for ${project.title}: ${error.message}`)
      return null
    })
    await payload.create({
      collection: 'projects',
      data: {
        ...project,
        slug: '',
        stack: [...project.stack],
        highlights: 'highlights' in project ? project.highlights.map((h) => ({ ...h })) : [],
        cover: cover?.id,
        status: 'published',
      },
      context,
    })
    payload.logger.info(`Seeded project: ${project.title}`)
  }

  for (const service of data.services) {
    if (await exists(payload, 'services', 'title', service.title)) continue
    await payload.create({
      collection: 'services',
      data: { ...service, features: [...service.features], status: 'published' },
      context,
    })
    payload.logger.info(`Seeded service: ${service.title}`)
  }

  for (const { coverUrl, ...post } of data.posts) {
    if (await exists(payload, 'posts', 'externalUrl', post.externalUrl)) continue
    const cover = await uploadFromUrl(
      payload,
      coverUrl,
      `Cover image for "${post.title}"`,
      slugify(post.title).slice(0, 60),
    )
    await payload.create({
      collection: 'posts',
      data: { ...post, tags: [...post.tags], cover: cover.id, status: 'published' },
      context,
    })
    payload.logger.info(`Seeded post: ${post.title}`)
  }

  payload.logger.info('Seed complete')
}

// `payload run` exits once the module has loaded, so the work must be awaited
// at the top level.
try {
  await seed()
  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
