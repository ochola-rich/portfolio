import { Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Profile } from '@/payload-types'

// Circular text badge that slowly rotates around the owner's initial.
function RotatingBadge({ name }: { name: string }) {
  const label = `${name} • Let's work together • `
  return (
    <div aria-hidden="true" className="relative hidden size-24 shrink-0 sm:block">
      <svg viewBox="0 0 100 100" className="size-full animate-spin-slow motion-reduce:animate-none">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="49" className="fill-muted" />
        <text className="fill-muted-foreground text-[8.5px] tracking-[0.18em] uppercase">
          <textPath href="#badge-circle">{label}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto grid size-12 place-items-center rounded-full bg-foreground font-display text-xl text-background">
        {name.charAt(0)}
      </span>
    </div>
  )
}

export function Contact({ profile }: { profile: Profile }) {
  const heading = (profile.contactHeading || '').split('\n')

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-start justify-between gap-6">
        <h2
          id="contact-heading"
          className="text-gradient font-display text-3xl leading-tight font-medium tracking-tight sm:text-4xl"
        >
          {heading.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
        <RotatingBadge name={profile.name} />
      </div>
      {profile.contactBody && (
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{profile.contactBody}</p>
      )}
      <p className="mt-10 text-xl font-medium">
        Looking For Something <em className="font-accent font-normal">Unique?</em>
        <br />
        Feel Free To Share <em className="font-accent font-normal">Your Ideas!</em>
      </p>
      <p className="mt-3 text-lg text-muted-foreground">
        Tell me what you are building and how I can help turn it into working software.
      </p>
      <Button asChild size="lg" className="mt-4 w-full">
        <a href={`mailto:${profile.email}`}>
          <span className="truncate">
            Drop me an email at <em className="font-accent text-base">{profile.email}</em>
          </span>
          <Mail aria-hidden="true" />
        </a>
      </Button>
    </div>
  )
}
