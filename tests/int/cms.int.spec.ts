import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { slugify } from '@/fields/slug'
import { validateHttpsUrl } from '@/fields/url'
import config from '@/payload.config'

const context = { disableRevalidate: true }
let payload: Payload
const created: number[] = []

describe('content model', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  })

  afterAll(async () => {
    for (const id of created) {
      await payload.delete({ collection: 'projects', id, context })
    }
  })

  it('slugifies titles', () => {
    expect(slugify('  Guardians of the Lake! ')).toBe('guardians-of-the-lake')
  })

  it('only accepts https links', () => {
    expect(validateHttpsUrl('https://dev.to/ochola/post')).toBe(true)
    expect(validateHttpsUrl('http://example.com')).toBeTypeOf('string')
    expect(validateHttpsUrl('not a url')).toBeTypeOf('string')
  })

  it('generates a slug and hides drafts from visitors', async () => {
    const draft = await payload.create({
      collection: 'projects',
      data: {
        title: 'Vitest Draft Project',
        slug: '',
        summary: 'Temporary project created by the integration tests.',
        year: 2026,
        category: 'Test',
        status: 'draft',
      },
      context,
    })
    created.push(draft.id)
    expect(draft.slug).toBe('vitest-draft-project')

    const asVisitor = await payload.find({
      collection: 'projects',
      where: { slug: { equals: draft.slug } },
      overrideAccess: false,
    })
    expect(asVisitor.totalDocs).toBe(0)

    const asAdmin = await payload.find({
      collection: 'projects',
      where: { slug: { equals: draft.slug } },
    })
    expect(asAdmin.totalDocs).toBe(1)
  })

  it('rejects a blog post without an https article URL', async () => {
    await expect(
      payload.create({
        collection: 'posts',
        data: {
          title: 'Bad link',
          excerpt: 'x',
          externalUrl: 'http://insecure.example.com',
          platform: 'other',
          publishedAt: new Date().toISOString(),
          status: 'draft',
        },
        context,
      }),
    ).rejects.toThrow()
  })
})
