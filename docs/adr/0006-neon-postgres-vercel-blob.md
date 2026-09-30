# ADR-0006: Neon Postgres and Vercel Blob for deployment on Vercel

- Status: Accepted
- Date: 2026-09-30
- Amends: ADR-0003 (local SQLite database)

## Context
The site deploys to Vercel's free tier. Vercel functions have no persistent, shared disk, so the SQLite file and the local `media/` folder from ADR-0003 cannot hold content in production: writes are lost and instances do not share them.

## Decision
- **Database:** Postgres via `@payloadcms/db-postgres`. Production uses Neon (free tier, provisioned through the Vercel marketplace integration, which sets `DATABASE_URL`). Local development uses Postgres in Docker (`docker-compose.yml`).
- **Schema changes:** development uses Payload's automatic schema push; production uses migrations in `src/migrations/` (`npm run migrate:create`). Vercel builds run `npm run ci`, which applies pending migrations before `next build`.
- **Media:** `@payloadcms/storage-vercel-blob`, enabled when `BLOB_READ_WRITE_TOKEN` is set, with client-side uploads to avoid Vercel's 4.5 MB request body limit. Without a token (local dev) files stay in `media/`.
- **Hosting:** Vercel, deploying from the GitHub repository `ochola-rich/portfolio`.

## Consequences
Content and uploads survive deployments and scale across instances. Every collection or field change needs a committed migration, or the production build fails. Local development needs Docker. The admin import map must be generated with a Blob token present (`BLOB_READ_WRITE_TOKEN=<any> npm run generate:importmap`) so the Blob upload component is included.
