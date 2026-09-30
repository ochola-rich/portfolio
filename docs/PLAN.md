# Portfolio — Project Plan

## Goal
A professional personal portfolio whose content is fully managed from a CMS: an about/hero section, a showcase of projects, and a blog section that shows post snippets and links out to the full article on dev.to (or another platform).

## Architecture
```
Browser                      Next.js app (single deployment)                 Storage
┌──────────────────┐  HTML   ┌───────────────────────────────────────────┐   ┌─────────┐
│ /  hero, about   │ ◀────── │ src/app/(frontend)  Server Components     │   │ SQLite  │
│ /projects        │         │   └─ src/lib/cms/*  (Payload Local API) ──┼──▶│ Postgres│
│ /projects/[slug] │         │                                           │   └─────────┘
│ /blog            │─ Read more ─▶ dev.to / Hashnode / Medium (external)  │   ┌─────────┐
│                  │         │ src/app/(payload)   /admin, /api  ────────┼──▶│ Blob    │
│ /admin (owner)   │ ◀─────▶ │   collections · globals · hooks           │   └─────────┘
└──────────────────┘         └───────────────────────────────────────────┘
```
Content edits in `/admin` trigger revalidation hooks so the public pages update without a redeploy.

## Content model (Payload)
| Kind | Slug | Key fields |
|---|---|---|
| Collection | `users` | admin accounts (auth) |
| Collection | `media` | image uploads with required `alt` |
| Collection | `projects` | title, slug, summary, description (rich text), cover image, gallery, tech stack tags, role, year, repo URL, live URL, featured, order, status (draft/published) |
| Collection | `posts` | title, excerpt (snippet), external URL, platform (dev.to/Hashnode/Medium/LinkedIn/other), cover image, tags, published date, reading time, status |
| Collection | `services` | title (with `*accent*` words), category (tab), description, optional price, features, CTA label, order, status |
| Global | `profile` | name, role, headline, intro, portrait, marquee items, availability, story (rich text), story photos, résumé file, email, booking URL, contact copy, social links |
| Global | `site-settings` | site title, SEO description, OG image, section titles, footer text |

## Source layout
```
src/
  app/(frontend)/        public routes, layouts, sections
  app/(payload)/         Payload admin + API (generated; do not edit by hand)
  collections/           Payload collections
  globals/               Payload globals
  components/ui/         shadcn/ui primitives
  components/<feature>/  composed components (projects, blog, layout, …)
  lib/cms/               typed queries over the Payload Local API
  lib/utils.ts           cn() and small helpers
tests/int/               Vitest
tests/e2e/               Playwright
docs/                    PLAN, ADRs, design reference
```

## Phases (in order; each ends with atomic commits)
0. **Scaffolding & governance** — Next.js + Payload, Tailwind v4, shadcn/ui, AGENTS.md, ADRs, tooling. *(done)*
1. **Design reference** — recorded in `docs/design/`; theme tokens and fonts set. *(done)*
2. **Content model** — `projects`, `posts`, `services` collections, `profile` and `site-settings` globals, access rules, revalidation hooks, generated types, integration tests, seed script with the owner's real GitHub/dev.to content. *(done)*
3. **Layout shell** — pill nav, section layout, footer, theme toggle, SEO defaults, `sitemap.ts`, `robots.ts`. *(done)*
4. **Home** — hero, marquee, featured project stack, story, services, latest posts, contact. *(done)*
5. **Portfolio showcase** — `/projects` grid and `/projects/[slug]` detail page. *(done; tag filter still open)*
6. **Blog** — `/blog` snippet cards with tag filter; "Read more" opens the external article in a new tab. *(done)*
7. **Polish** — loading/empty/error states, accessibility pass, image optimisation, Lighthouse run (real numbers in README).
8. **Deployment** — Vercel + Neon Postgres + Vercel Blob (ADR-0006), migrations, env docs, README.
9. **Bonus (optional, ask first)** — import posts from the dev.to API, contact form, analytics, admin live preview. LinkedIn posts cannot be fetched automatically (no public read API for member posts); they are added by URL in the admin.
