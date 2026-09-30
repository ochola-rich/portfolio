# ADR-0003: Payload CMS embedded in the Next.js app

- Status: Accepted (database and media storage amended by ADR-0006)
- Date: 2026-09-29

## Context
The portfolio needs a professional CMS so projects, posts and profile content are edited without touching code. Options considered: Payload (self-hosted, runs inside Next.js), Sanity (hosted SaaS), Keystatic (Git-based files).

## Decision
Use Payload CMS 3 installed into the same Next.js app. Admin lives at `/admin`, REST/GraphQL under `/api`. The frontend reads content through the Payload Local API (no HTTP hop) via `src/lib/cms/`. Local development uses SQLite (`@payloadcms/db-sqlite`, `DATABASE_URL=file:./portfolio.db`); the production database is decided in the deployment ADR.

## Consequences
One codebase and one deployment, typed content (`src/payload-types.ts`), no third-party SaaS account or per-seat cost. The host must run a Node server with a persistent database and media storage (not purely static hosting). Schema changes require regenerating types and, for SQL adapters in production, migrations.
