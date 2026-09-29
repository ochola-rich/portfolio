import Image from 'next/image'

import { asMedia } from '@/lib/cms'
import { cn } from '@/lib/utils'
import type { Project } from '@/payload-types'

export function ProjectCover({ project, className }: { project: Project; className?: string }) {
  const cover = asMedia(project.cover)

  if (cover?.url) {
    return (
      <div
        className={cn(
          'relative aspect-[2/1] overflow-hidden rounded-2xl bg-background ring-1 ring-black/5',
          className,
        )}
      >
        <Image
          src={cover.url}
          alt={cover.alt}
          fill
          sizes="(min-width: 768px) 560px, 100vw"
          className="object-cover"
        />
      </div>
    )
  }

  // Without a screenshot, show a typographic cover instead of an empty box.
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative flex aspect-[2/1] items-end overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-6',
        className,
      )}
    >
      <span className="bg-grid absolute inset-0 opacity-60" />
      <p className="relative font-display text-3xl font-medium tracking-tight sm:text-4xl">
        {project.title}
      </p>
    </div>
  )
}
