# ADR-0004: Blog shows snippets and links to external platforms

- Status: Accepted
- Date: 2026-09-29

## Context
The owner publishes full articles on platforms such as dev.to. The portfolio should surface them without duplicating the writing or splitting readership.

## Decision
The `posts` collection stores metadata only: title, excerpt, cover, tags, date, platform and an `externalUrl` (https). The `/blog` page renders snippet cards; "Read more" opens `externalUrl` in a new tab with `rel="noopener noreferrer"`. There are no on-site article pages.

## Consequences
Posts are entered manually in the CMS for now. Automatic import from the dev.to API is a possible later phase (ask first). SEO credit for the article stays with the external platform.
