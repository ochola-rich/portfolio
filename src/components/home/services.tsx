'use client'

import { ArrowUpRight, Monitor, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { AccentText } from '@/components/shared/accent-text'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Service } from '@/payload-types'

export function Services({ services, contactHref }: { services: Service[]; contactHref: string }) {
  const categories = [...new Set(services.map((service) => service.category))]
  const [active, setActive] = useState(categories[0])
  const visible = services.filter((service) => service.category === active)

  return (
    <div className="mx-auto max-w-5xl">
      <div
        role="tablist"
        aria-label="Service categories"
        className="flex flex-wrap justify-center gap-3"
      >
        {categories.map((category) => {
          const selected = category === active
          return (
            <button
              key={category}
              type="button"
              role="tab"
              id={`tab-${category}`}
              aria-selected={selected}
              aria-controls="services-panel"
              onClick={() => setActive(category)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                selected ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70',
              )}
            >
              {category}
              {selected && <Sparkles className="size-4" aria-hidden="true" />}
            </button>
          )
        })}
      </div>

      <div
        id="services-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="mt-10 grid overflow-hidden rounded-3xl bg-muted md:grid-cols-2 md:divide-x md:divide-border"
      >
        {visible.map((service) => (
          <article key={service.id} className="flex flex-col p-6 sm:p-7">
            <Monitor className="size-6" aria-hidden="true" />
            <h3 className="mt-5 text-xl font-medium">
              <AccentText text={service.title} />
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
            {service.price && (
              <p className="mt-5">
                <span className="text-4xl font-medium tracking-tight">{service.price}</span>
                {service.priceNote && (
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {service.priceNote}
                  </span>
                )}
              </p>
            )}
            <Button asChild size="lg" className="mt-6">
              <a href={contactHref}>
                {service.ctaLabel || "Let's talk"} <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            {service.features && service.features.length > 0 && (
              <ul className="mt-6 divide-y divide-border">
                {service.features.map((feature) => (
                  <li key={feature} className="py-3 text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
