import { cache } from 'react'

import type { Media, Post, Profile, Project, Service, SiteSetting } from '@/payload-types'

import { getClient } from './client'

// All public queries run with overrideAccess: false so visitors only ever see
// what the collection access rules allow (published documents).
const publicRead = { overrideAccess: false, depth: 1 } as const

export const getProfile = cache(async (): Promise<Profile> => {
  const payload = await getClient()
  return payload.findGlobal({ slug: 'profile', ...publicRead })
})

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getClient()
  return payload.findGlobal({ slug: 'site-settings', ...publicRead })
})

export const getFeaturedProjects = cache(async (limit = 5): Promise<Project[]> => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { featured: { equals: true } },
    sort: 'order',
    limit,
    ...publicRead,
  })
  return docs
})

export const getProjects = cache(async (): Promise<Project[]> => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'projects',
    sort: ['order', '-year'],
    pagination: false,
    ...publicRead,
  })
  return docs
})

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    ...publicRead,
  })
  return docs[0] ?? null
})

export const getPosts = cache(async (options: { limit?: number; tag?: string } = {}) => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: options.tag ? { tags: { contains: options.tag } } : undefined,
    sort: '-publishedAt',
    limit: options.limit ?? 100,
    ...publicRead,
  })
  return docs satisfies Post[]
})

export const getServices = cache(async (): Promise<Service[]> => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'services',
    sort: 'order',
    pagination: false,
    ...publicRead,
  })
  return docs
})

// Upload fields are either a populated Media doc or just its id (depth 0).
export function asMedia(value: number | Media | null | undefined): Media | null {
  return value && typeof value === 'object' ? value : null
}
