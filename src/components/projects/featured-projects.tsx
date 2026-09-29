import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { Project } from '@/payload-types'

import { ProjectCover } from './project-cover'
import { tintClasses } from './tints'

// Each card sticks a little lower than the previous one, so scrolling stacks
// them into the layered pile from the design.
const stickyOffsets = ['top-24', 'top-[8.5rem]', 'top-[11.5rem]', 'top-[14.5rem]', 'top-[17.5rem]']

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="text-center text-muted-foreground">Projects are on their way.</p>
  }

  return (
    <ol className="mx-auto flex max-w-4xl flex-col gap-6">
      {projects.map((project, i) => (
        <li
          key={project.id}
          className={cn(
            'sticky rounded-3xl px-5 pt-4 pb-6 shadow-[0_0_40px_-6px] ring-1 ring-black/5 sm:px-6 dark:ring-white/10',
            stickyOffsets[i] ?? stickyOffsets.at(-1),
            tintClasses[project.tint ?? 'blue'],
          )}
        >
          <article>
            <div className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-3 text-sm text-foreground/70">
              <span>{project.year}</span>
              <span className="text-right">{project.category}</span>
            </div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <h3 className="text-xl leading-snug font-medium sm:text-2xl">
                <Link
                  href={`/projects/${project.slug}`}
                  className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
                >
                  {project.title}
                </Link>
              </h3>
              <ArrowRight className="mt-1 size-5 shrink-0" aria-hidden="true" />
            </div>
            <p className="mt-2 text-muted-foreground">{project.summary}</p>
            {project.highlights && project.highlights.length > 0 && (
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <div key={highlight.id ?? highlight.value}>
                    <dt className="font-medium">{highlight.value}</dt>
                    <dd className="mt-1 text-sm text-muted-foreground">{highlight.label}</dd>
                  </div>
                ))}
              </dl>
            )}
            {project.stack && project.stack.length > 0 && (
              <p className="mt-5 text-sm text-muted-foreground">
                Stack - {project.stack.join(', ')}
              </p>
            )}
            {project.cover && <ProjectCover project={project} className="mt-5" />}
          </article>
        </li>
      ))}
    </ol>
  )
}
