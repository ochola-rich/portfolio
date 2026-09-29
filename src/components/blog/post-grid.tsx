import type { Post } from '@/payload-types'

import { PostCard } from './post-card'

export function PostGrid({
  posts,
  emptyText = 'No articles yet — check back soon.',
}: {
  posts: Post[]
  emptyText?: string
}) {
  if (posts.length === 0) {
    return <p className="text-center text-muted-foreground">{emptyText}</p>
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <li key={post.id} className="flex">
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
