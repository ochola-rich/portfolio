import type { Project } from '@/payload-types'

type Tint = NonNullable<Project['tint']>

// Full class strings so Tailwind can see them at build time.
export const tintClasses: Record<Tint, string> = {
  blue: 'bg-sky-50 shadow-sky-300/70 dark:bg-sky-950/60 dark:shadow-sky-500/20',
  violet: 'bg-violet-50 shadow-violet-300/70 dark:bg-violet-950/60 dark:shadow-violet-500/20',
  green: 'bg-lime-50 shadow-lime-300/70 dark:bg-lime-950/50 dark:shadow-lime-500/20',
  amber: 'bg-amber-50 shadow-amber-300/70 dark:bg-amber-950/50 dark:shadow-amber-500/20',
  rose: 'bg-pink-50 shadow-pink-300/70 dark:bg-pink-950/50 dark:shadow-pink-500/20',
}
