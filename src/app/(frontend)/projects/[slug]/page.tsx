import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Section } from '@/components/layout/section'
import { ProjectCover } from '@/components/projects/project-cover'
import { ExternalLink } from '@/components/shared/external-link'
import { platformLabels, SocialIcon } from '@/components/shared/social-icon'
import { getProjectBySlug, getProjects } from '@/lib/cms'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug((await params).slug)
  if (!project) return {}
  return { title: project.title, description: project.summary }
}

const buttonClass =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug((await params).slug)
  if (!project) notFound()

  return (
    <Section ticks={false} className="border-t-0 px-4 py-12 sm:px-8">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> All projects
        </Link>
        <p className="mt-8 text-sm text-muted-foreground">
          {project.year} · {project.category}
        </p>
        <h1 className="text-gradient mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <ExternalLink
              href={project.liveUrl}
              className={`${buttonClass} bg-primary text-primary-foreground hover:opacity-90`}
            >
              Visit live site <ArrowUpRight className="size-4" aria-hidden="true" />
            </ExternalLink>
          )}
          {project.repoUrl && (
            <ExternalLink
              href={project.repoUrl}
              className={`${buttonClass} border border-border hover:bg-muted`}
            >
              <SocialIcon platform="github" className="size-4" /> View source
              <span className="sr-only">on {platformLabels.github}</span>
            </ExternalLink>
          )}
        </div>

        <ProjectCover project={project} className="mt-10" />

        {project.highlights && project.highlights.length > 0 && (
          <dl className="mt-10 grid gap-6 rounded-3xl bg-muted p-6 sm:grid-cols-2">
            {project.highlights.map((highlight) => (
              <div key={highlight.id ?? highlight.value}>
                <dt className="font-display text-2xl font-medium">{highlight.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{highlight.label}</dd>
              </div>
            ))}
          </dl>
        )}

        {project.description && (
          <RichText
            data={project.description}
            className="mt-10 space-y-4 leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_li]:ml-5 [&_strong]:text-foreground [&_ul]:list-disc"
          />
        )}

        {project.stack && project.stack.length > 0 && (
          <section aria-labelledby="stack-heading" className="mt-10">
            <h2 id="stack-heading" className="font-medium">
              Stack
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full bg-muted px-3 py-1 text-sm">
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </Section>
  )
}
