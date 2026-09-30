import { ArrowDown, Headphones } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { asMedia } from '@/lib/cms'
import { bookingHref } from '@/lib/contact'
import type { Profile } from '@/payload-types'

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// Frosted vertical strips over the left of the portrait, echoing the reference.
function GlassStrips() {
  const blurs = [
    'backdrop-blur-xl',
    'backdrop-blur-lg',
    'backdrop-blur-md',
    'backdrop-blur-sm',
    'backdrop-blur-[2px]',
  ]
  return (
    <div aria-hidden="true" className="absolute inset-y-0 left-0 flex w-1/2">
      {blurs.map((blur) => (
        <span key={blur} className={`h-full flex-1 border-r border-white/10 ${blur}`} />
      ))}
    </div>
  )
}

export function Hero({ profile }: { profile: Profile }) {
  const portrait = asMedia(profile.portrait)
  const headlineLines = profile.headline.split('\n')

  return (
    <div className="grid items-center gap-10 px-6 pt-10 pb-14 sm:px-8 md:grid-cols-[1.15fr_1fr] md:pt-12 md:pb-16">
      <div className="relative z-10">
        {profile.available && (
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
            <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
            {profile.availabilityLabel}
          </p>
        )}
        <h1 className="text-gradient mt-6 font-display text-4xl leading-[1.15] font-medium tracking-tight sm:text-5xl md:w-[120%] lg:text-6xl">
          {headlineLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
          {profile.intro}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href={bookingHref(profile)}>
              Book a Call <Headphones aria-hidden="true" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#projects">
              View My Work <ArrowDown aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-200 dark:bg-neutral-800">
        {portrait?.url ? (
          <Image
            src={portrait.url}
            alt={portrait.alt}
            fill
            priority
            sizes="(min-width: 768px) 420px, 100vw"
            className="object-cover grayscale"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-neutral-100 via-neutral-300 to-neutral-700 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-950">
            <span className="font-display text-[9rem] leading-none font-semibold text-neutral-900/80 dark:text-neutral-100/80">
              {initials(profile.name)}
            </span>
          </div>
        )}
        <GlassStrips />
      </div>
    </div>
  )
}
