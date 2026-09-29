# Portfolio

Personal portfolio built with Next.js, shadcn/ui and Payload CMS. Projects, blog snippets (linking out to dev.to and similar platforms) and profile content are all managed from the admin panel.

## Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4 + shadcn/ui
- Payload CMS 3 (admin at `/admin`), SQLite for local development

## Getting started
```bash
cp .env.example .env   # then set PAYLOAD_SECRET to a long random string
npm install
npm run seed           # optional: load the initial profile, projects, services and posts
npm run dev
```
- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (create the first user on first visit)

## Scripts
| Command | Purpose |
|---|---|
| `npm run dev` | start the dev server |
| `npm run build` / `npm start` | production build / serve |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run test:int` | Vitest integration tests |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run seed` | load initial content (skips documents that already exist) |
| `npm run generate:types` | regenerate `src/payload-types.ts` after schema changes |

## Editing content
Everything on the site comes from `/admin`:
- **Profile** (global): hero text, portrait, marquee, story, résumé, contact details, social links
- **Site Settings** (global): title, SEO description, OG image, section titles, footer
- **Projects**: set *Featured* to show a project in the home stack; *Tint* picks its card colour
- **Posts**: a snippet plus the article's URL on dev.to, Hashnode, Medium or LinkedIn
- **Services**: grouped into tabs by *Category*; wrap words in `*asterisks*` for the italic accent

Only documents with status *Published* are visible on the site.

## Docs
- `AGENTS.md` — rules for contributors and AI agents
- `docs/PLAN.md` — architecture, content model, phases
- `docs/adr/` — architecture decisions
- `docs/design/` — design reference
