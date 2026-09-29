# ADR-0002: Next.js App Router with shadcn/ui and Tailwind CSS v4

- Status: Accepted
- Date: 2026-09-29

## Context
The owner chose Next.js and shadcn/ui. The site is mostly static content that should be fast, SEO-friendly and easy to restyle from a design reference.

## Decision
Use Next.js 16 (App Router, React Server Components, TypeScript strict). Style with Tailwind CSS v4 and theme tokens as CSS variables in `src/app/(frontend)/globals.css`. Use shadcn/ui (new-york style, Radix primitives, lucide icons) copied into `src/components/ui/` via the shadcn CLI.

## Consequences
Pages render on the server and ship little JavaScript. Restyling for the design reference is mostly a token change. shadcn components are owned code and updated deliberately, not via a package bump.
