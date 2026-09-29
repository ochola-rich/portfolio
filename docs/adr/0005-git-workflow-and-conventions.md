# ADR-0005: Git workflow and conventions

- Status: Accepted
- Date: 2026-09-29

## Context
Agents and humans commit to this repository; history must stay readable and attributable to the owner.

## Decision
Conventional Commits with the scopes listed in `AGENTS.md`, small atomic commits made as work progresses, short-lived branches merged by PR into a linear `main`, owner identity only and no tool attribution, and no pushing without explicit request. Full rules in `AGENTS.md` §3.

## Consequences
History reads as a changelog; every commit builds; nothing leaves the machine without the owner's say-so.
