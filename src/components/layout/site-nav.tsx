import { House } from 'lucide-react'
import Link from 'next/link'

import { ExternalLink } from '@/components/shared/external-link'
import { platformLabels, SocialIcon } from '@/components/shared/social-icon'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/contact'
import type { Profile } from '@/payload-types'

import { ThemeToggle } from './theme-toggle'

const linkClass =
  'rounded-full px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'

export function SiteNav({ profile }: { profile: Profile }) {
  const socials = (profile.socials ?? []).slice(0, 3)

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="flex items-center gap-1 rounded-full border border-border/80 bg-background/80 p-1.5 shadow-sm backdrop-blur-md"
      >
        <Link href="/" className={`${linkClass} flex items-center gap-1.5`}>
          Home <House className="size-4" aria-hidden="true" />
        </Link>
        <Link href="/projects" className={linkClass}>
          Work
        </Link>
        <Link href="/blog" className={linkClass}>
          Blog
        </Link>

        {socials.length > 0 && (
          <>
            <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-border sm:block" />
            <ul className="hidden items-center sm:flex">
              {socials.map((social) => (
                <li key={social.id ?? social.url}>
                  <ExternalLink
                    href={social.url}
                    className="grid size-9 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <SocialIcon platform={social.platform} className="size-4" />
                    <span className="sr-only">{platformLabels[social.platform]}</span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </>
        )}

        <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
        <ThemeToggle />
        <Button asChild className="ml-1 hidden sm:inline-flex">
          <a href={bookingHref(profile)}>Book a Call</a>
        </Button>
      </nav>
    </header>
  )
}
