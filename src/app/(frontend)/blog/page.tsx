import type { Metadata } from 'next'
import Link from 'next/link'

import { PostGrid } from '@/components/blog/post-grid'
import { Section, SectionHeading } from '@/components/layout/section'
import { getPosts } from '@/lib/cms'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on AI engineering, Go and building for the web.',
}

type Props = { searchParams: Promise<{ tag?: string }> }

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams
  const [allPosts, posts] = await Promise.all([getPosts(), getPosts({ tag })])
  const tags = [...new Set(allPosts.flatMap((post) => post.tags ?? []))].sort()

  const chip = (active: boolean) =>
    cn(
      'rounded-full px-4 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
      active ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70',
    )

  return (
    <Section className="px-4 py-16 sm:px-8" labelledBy="blog-heading">
      <SectionHeading id="blog-heading">Blog</SectionHeading>
      <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
        Snippets of what I write. Each article opens on the platform where it is published.
      </p>
      {tags.length > 0 && (
        <nav aria-label="Filter by tag" className="mt-10 flex flex-wrap justify-center gap-2">
          <Link href="/blog" className={chip(!tag)} aria-current={!tag ? 'page' : undefined}>
            All
          </Link>
          {tags.map((t) => (
            <Link
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className={chip(t === tag)}
              aria-current={t === tag ? 'page' : undefined}
            >
              #{t}
            </Link>
          ))}
        </nav>
      )}
      <div className="mt-10">
        <PostGrid posts={posts} emptyText={tag ? `No articles tagged #${tag} yet.` : undefined} />
      </div>
    </Section>
  )
}
