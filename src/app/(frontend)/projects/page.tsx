import type { Metadata } from 'next'

import { Section, SectionHeading } from '@/components/layout/section'
import { ProjectCard } from '@/components/projects/project-card'
import { getProjects } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects: AI systems, backends, payments and web apps.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <Section ticks={false} className="border-t-0 px-4 py-16 sm:px-8" labelledBy="projects-heading">
      <SectionHeading id="projects-heading">Projects</SectionHeading>
      <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
        Things I have designed, built and shipped.
      </p>
      {projects.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">Projects are on their way.</p>
      ) : (
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
