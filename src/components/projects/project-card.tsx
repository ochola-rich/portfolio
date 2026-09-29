import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { Project } from '@/payload-types'

import { ProjectCover } from './project-cover'
import { tintClasses } from './tints'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-3xl p-5 shadow-[0_0_30px_-10px] ring-1 ring-black/5 dark:ring-white/10',
        tintClasses[project.tint ?? 'blue'],
      )}
    >
      <ProjectCover project={project} />
      <div className="mt-5 flex items-center justify-between gap-4 text-sm text-foreground/70">
        <span>{project.year}</span>
        <span className="text-right">{project.category}</span>
      </div>
      <h2 className="mt-3 flex items-start justify-between gap-4 text-xl font-medium">
        <Link
          href={`/projects/${project.slug}`}
          className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
        >
          {project.title}
        </Link>
        <ArrowRight
          className="mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </h2>
      <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{project.summary}</p>
    </article>
  )
}
