import Link from 'next/link'

import { PostGrid } from '@/components/blog/post-grid'
import { Contact } from '@/components/home/contact'
import { Hero } from '@/components/home/hero'
import { Marquee } from '@/components/home/marquee'
import { Services } from '@/components/home/services'
import { Story } from '@/components/home/story'
import { Section, SectionHeading } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { FeaturedProjects } from '@/components/projects/featured-projects'
import { getFeaturedProjects, getPosts, getProfile, getServices, getSiteSettings } from '@/lib/cms'
import { bookingHref } from '@/lib/contact'

export default async function HomePage() {
  const [profile, settings, projects, services, posts] = await Promise.all([
    getProfile(),
    getSiteSettings(),
    getFeaturedProjects(),
    getServices(),
    getPosts({ limit: 4 }),
  ])
  const titles = settings.sections

  return (
    <>
      <Section ticks={false} className="border-t-0">
        <Hero profile={profile} />
      </Section>

      {profile.marquee && profile.marquee.length > 0 && (
        <Section>
          <Marquee items={profile.marquee} />
        </Section>
      )}

      <Section id="projects" labelledBy="projects-heading" className="px-4 py-16 sm:px-8">
        <SectionHeading id="projects-heading">{titles?.projectsTitle}</SectionHeading>
        <div className="mt-14">
          <FeaturedProjects projects={projects} />
        </div>
        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/projects">See all projects</Link>
          </Button>
        </div>
      </Section>

      <Section id="story" labelledBy="story-heading" className="px-6 py-16 sm:px-8">
        <SectionHeading id="story-heading">{titles?.storyTitle}</SectionHeading>
        <div className="mt-12">
          <Story profile={profile} />
        </div>
      </Section>

      {services.length > 0 && (
        <Section id="services" labelledBy="services-heading" className="px-4 py-16 sm:px-8">
          <SectionHeading id="services-heading">{titles?.servicesTitle}</SectionHeading>
          <div className="mt-10">
            <Services services={services} contactHref={bookingHref(profile)} />
          </div>
        </Section>
      )}

      <Section id="blog" labelledBy="blog-heading" className="px-4 py-16 sm:px-8">
        <SectionHeading id="blog-heading">{titles?.blogTitle}</SectionHeading>
        <div className="mt-12">
          <PostGrid posts={posts} />
        </div>
        {posts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/blog">All articles</Link>
            </Button>
          </div>
        )}
      </Section>

      <Section id="contact" labelledBy="contact-heading" className="px-6 py-16 sm:px-8">
        <Contact profile={profile} />
      </Section>
    </>
  )
}
