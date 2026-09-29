import { ExternalLink } from '@/components/shared/external-link'
import { platformLabels, SocialIcon } from '@/components/shared/social-icon'
import type { Profile, SiteSetting } from '@/payload-types'

export function SiteFooter({ profile, settings }: { profile: Profile; settings: SiteSetting }) {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row">
      <p>{settings.footerText || `© ${year} ${profile.name}`}</p>
      {profile.socials && profile.socials.length > 0 && (
        <ul className="flex items-center gap-1">
          {profile.socials.map((social) => (
            <li key={social.id ?? social.url}>
              <ExternalLink
                href={social.url}
                className="grid size-9 place-items-center rounded-full transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <SocialIcon platform={social.platform} className="size-4" />
                <span className="sr-only">{platformLabels[social.platform]}</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      )}
    </footer>
  )
}
