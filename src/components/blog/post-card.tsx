import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { ExternalLink } from '@/components/shared/external-link'
import { asMedia } from '@/lib/cms'
import type { Post } from '@/payload-types'

const platformNames: Record<Post['platform'], string> = {
  devto: 'DEV',
  hashnode: 'Hashnode',
  medium: 'Medium',
  linkedin: 'LinkedIn',
  other: 'the web',
}

const dateFormat = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function PostCard({ post }: { post: Post }) {
  const cover = asMedia(post.cover)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-muted ring-1 ring-border/60 transition-shadow hover:shadow-lg">
      {cover?.url && (
        <div className="relative aspect-[1000/420] overflow-hidden">
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>{dateFormat.format(new Date(post.publishedAt))}</time>
          <span aria-hidden="true">·</span>
          <span>{platformNames[post.platform]}</span>
          {post.readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </>
          )}
        </p>
        <h3 className="mt-3 text-xl leading-snug font-medium">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        {post.tags && post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}
        <ExternalLink
          href={post.externalUrl}
          className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
        >
          Read more on {platformNames[post.platform]}
          <ArrowUpRight
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </ExternalLink>
      </div>
    </article>
  )
}
