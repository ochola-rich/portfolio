import type { Project } from '@/payload-types'

type Tint = NonNullable<Project['tint']>

// Full class strings so Tailwind can see them at build time. Dark tints are
// mixed with the page background rather than made transparent, so stacked
// cards stay opaque and the card underneath never shows through.
export const tintClasses: Record<Tint, string> = {
  blue: 'bg-sky-50 shadow-sky-300/70 dark:bg-[color-mix(in_oklab,var(--color-sky-950)_60%,var(--background))] dark:shadow-sky-500/20',
  violet:
    'bg-violet-50 shadow-violet-300/70 dark:bg-[color-mix(in_oklab,var(--color-violet-950)_60%,var(--background))] dark:shadow-violet-500/20',
  green:
    'bg-lime-50 shadow-lime-300/70 dark:bg-[color-mix(in_oklab,var(--color-lime-950)_50%,var(--background))] dark:shadow-lime-500/20',
  amber:
    'bg-amber-50 shadow-amber-300/70 dark:bg-[color-mix(in_oklab,var(--color-amber-950)_50%,var(--background))] dark:shadow-amber-500/20',
  rose: 'bg-pink-50 shadow-pink-300/70 dark:bg-[color-mix(in_oklab,var(--color-pink-950)_50%,var(--background))] dark:shadow-pink-500/20',
}
