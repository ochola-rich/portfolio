import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

function Tick({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={cn('absolute size-3 border-foreground/60', className)} />
  )
}

// A band of the framed page: a hairline top border with the crop-mark ticks
// at both ends, as in the design reference.
export function Section({
  id,
  children,
  className,
  ticks = true,
  labelledBy,
}: {
  id?: string
  children: ReactNode
  className?: string
  ticks?: boolean
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative scroll-mt-24 border-t border-border/70', className)}
    >
      {ticks && (
        <>
          <Tick className="-top-px -left-3 w-3 border-t" />
          <Tick className="-top-1.5 -left-px h-3 border-l" />
          <Tick className="-top-px -right-3 w-3 border-t" />
          <Tick className="-top-1.5 -right-px h-3 border-r" />
        </>
      )}
      {children}
    </section>
  )
}

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-gradient text-center font-display text-3xl font-medium tracking-tight sm:text-4xl"
    >
      {children}
    </h2>
  )
}
