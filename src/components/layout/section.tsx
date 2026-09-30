import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id?: string
  children: ReactNode
  className?: string
  labelledBy?: string
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('scroll-mt-24', className)}>
      {children}
    </section>
  )
}

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-gradient text-center font-display text-[2rem] leading-tight font-medium tracking-tight"
    >
      {children}
    </h2>
  )
}
