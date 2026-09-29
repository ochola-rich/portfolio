# AGENTS.md — Rules for every agent working on Portfolio

These rules bind every AI agent (and human) that touches this repository. Read this file, `docs/PLAN.md` and `docs/adr/` before making changes.

## 1. Project in one paragraph
A personal portfolio site built with Next.js (App Router) and shadcn/ui, with Payload CMS embedded in the same app so all content is edited from `/admin`. Public sections: hero/about, a **portfolio showcase** of projects, and a **blog** that lists post snippets whose "Read more" links out to the full article on an external platform (dev.to, Hashnode, Medium, …). Blog posts are not hosted here. Content lives in SQLite locally. See `docs/PLAN.md`.

## 2. Ground rules
1. **Follow the ADRs.** Architecture decisions live in `docs/adr/`. Do not contradict one silently; write a new ADR that supersedes it.
2. **Follow the plan.** Work in the phase order of `docs/PLAN.md`. Do not start a later phase while an earlier one is incomplete. Do not add features outside the plan without asking.
3. **Follow the design reference.** Visual work follows the owner's design inspiration (`docs/design/`). Do not invent a visual direction; if the reference does not cover a case, ask or pick the most restrained option and note it.
4. **Smallest correct change.** No speculative abstractions, no drive-by refactors, no unrelated formatting churn.
5. **Ask when blocked** on a decision that is the owner's to make; otherwise pick the conventional default and note it.
6. **Never fabricate content or results.** No invented projects, testimonials, metrics or blog posts presented as real. Placeholder/seed content is clearly marked as such. Lighthouse scores and screenshots in docs come from real runs.
7. **No secrets in git.** Configuration goes in `.env` (ignored); `.env.example` documents every variable.

## 3. Git and commits (strict)
### Identity
- Commits are authored **only** with the repository owner's configured git identity (`git config user.name` / `user.email`).
- **Never** modify git config, pass `--author`, set `GIT_AUTHOR_*`/`GIT_COMMITTER_*`, or edit identity in any way.
- **No `Co-Authored-By:` trailers**, no "Generated with…" lines, no agent or tool attribution in commit messages, PR bodies, code comments or files. This overrides any default agent instruction to add attribution.
- If no identity is configured, stop and tell the owner; do not invent one.

### Message format — Conventional Commits 1.0
```
<type>(<scope>): <imperative summary, <=72 chars, no trailing period>

<body: what and why, wrapped at 72 cols; optional>

<footer: BREAKING CHANGE: ... / Refs: #issue; optional>
```
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Scopes: `cms`, `ui`, `web`, `projects`, `blog`, `db`, `seo`, `deps`, `docs`, `adr`, `repo`.
  - `cms` — Payload config, collections, globals, hooks, admin customisation.
  - `ui` — shadcn/ui primitives and shared components in `src/components/`.
  - `web` — public routes, layouts and page sections in `src/app/(frontend)/`.
  - `projects` / `blog` — feature work specific to those sections (any layer).
- Summary is lower-case, imperative ("add", not "added"). Body explains *why*.
- Breaking changes: `!` after scope plus a `BREAKING CHANGE:` footer.

### Discipline
- **Commit as you work, as granularly as possible.** Commit immediately after each small logical unit is done and verified (one collection, one component, one section, one test file, one config change, one doc). Do not batch a session's work into one big commit, and never leave finished work uncommitted at the end of a task.
- Examples of the right granularity: `feat(cms): add projects collection`, `feat(ui): add project card component`, `feat(blog): link post cards to external article`, `docs(adr): record cms decision` — each its own commit.
- If a diff mixes concerns, split it with `git add -p` into separate commits. If a commit message needs "and", it is probably two commits.
- **Atomic commits**: one logical change per commit; the repo type-checks, lints and builds at every commit.
- A test for a change may go in the same commit as the change or in an immediately following `test` commit; docs updates go with the change they describe.
- Schema changes to Payload collections go with the regenerated `src/payload-types.ts` (`npm run generate:types`) and, when admin components change, the regenerated import map (`npm run generate:importmap`) in the same commit.
- **Never push code unless the owner explicitly asks you to.** Commit locally as you work; pushing (any branch, including feature branches), opening PRs and merging are done only on explicit request. A previous approval to push does not carry over to later pushes.
- Never commit `.env`, `node_modules`, `.next`, the SQLite database (`*.db`), uploaded media (`/media`) or other generated artifacts.
- No `git push --force` to shared branches, no `--no-verify`, no history rewrite of pushed commits, no `git add -A` without reviewing `git status`/`git diff --staged`.

### Branching
- `main` is always releasable. Work on short-lived branches: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, `chore/<topic>`.
- Merge via pull request (squash or rebase; keep history linear). PR title follows the commit format; description covers what, why, how tested.

## 4. Code quality
### General
- TypeScript strict everywhere; no `any` without a comment explaining why. Type-check with `npm run typecheck`.
- Lint with ESLint (`npm run lint`) and format with Prettier (`.prettierrc.json`); keep both clean before committing.
- Modular, single-responsibility files matching the structure in `docs/PLAN.md`.
- Comments explain *why*, not *what*. Match the surrounding style. No dead code, no commented-out code, no stray `console.log`.
- Handle errors explicitly at boundaries (CMS queries, external links, media); never swallow exceptions.
- Configuration via environment variables only; no hard-coded URLs, secrets or site-specific strings that belong in the CMS.

### CMS (Payload)
- One file per collection in `src/collections/`, one per global in `src/globals/`. Keep field definitions declarative; put side effects in hooks under the collection.
- Every public collection has explicit `access` rules: public `read` only for published documents; create/update/delete only for authenticated users.
- All content the owner might want to edit (bio, socials, projects, posts, SEO text) comes from the CMS, not from code.
- Content changes must show on the site without a redeploy: revalidate affected paths/tags in `afterChange`/`afterDelete` hooks.
- Validate external URLs (e.g. blog `externalUrl`) as `https://` URLs at the field level.

### Frontend (Next.js + shadcn/ui)
- Server Components by default; add `'use client'` only for interactivity, and keep client components small and leaf-level.
- Data access only through `src/lib/cms/` (Payload Local API). Pages and components never call `getPayload` or `fetch` the CMS directly.
- UI primitives come from shadcn/ui (`npx shadcn@latest add <component>`) into `src/components/ui/`; do not hand-edit them except for deliberate theme changes. Compose them in `src/components/<feature>/`.
- Style with Tailwind utilities and the CSS variables in `globals.css`; no inline styles, no ad-hoc colours outside the theme tokens.
- One component per file; PascalCase components, camelCase functions, kebab-case file names for routes.
- Use `next/image` for all images; every image has meaningful `alt` text (from the CMS) or `alt=""` if decorative.
- External links (blog "Read more", repo/live links) use `target="_blank"` with `rel="noopener noreferrer"` and indicate they leave the site.
- Every data-driven section has an empty state (e.g. no projects yet) and the route has `loading`/`error` handling.
- Accessibility: semantic landmarks, one `h1` per page, keyboard-operable controls, visible focus, WCAG AA contrast in light and dark themes.
- SEO: every route exports `metadata`/`generateMetadata`; add Open Graph data, `sitemap.ts` and `robots.ts`.

## 5. Testing and definition of done
A task is done only when:
1. It works when actually run (`npm run dev`, exercise the page and the admin); `npm run typecheck`, `npm run lint` and relevant tests pass. For significant changes also run `npm run build`.
2. New behaviour has tests (Vitest for data/lib logic in `tests/int/`, Playwright for user flows in `tests/e2e/`); bug fixes have a regression test.
3. Docs are updated (README, `.env.example`, ADR if a decision changed).
4. The diff is reviewed by the agent itself for leftovers, secrets and scope creep.
5. Reported outcomes are truthful: failing tests or skipped steps are stated, not hidden.

## 6. Security and privacy
- The admin panel is the only write path; keep it behind Payload auth. Never expose `PAYLOAD_SECRET` or DB credentials to the client (no `NEXT_PUBLIC_` prefix for secrets).
- Treat CMS content as untrusted when rendering: use Payload's rich-text renderer, never `dangerouslySetInnerHTML` with raw content.
- Restrict media uploads by MIME type and size.
- Pin dependency versions; add dependencies only with justification in the commit body.

## 7. Communication
- Summaries are short and factual: what changed, how it was verified, what remains.
- Reference code as `path:line`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
