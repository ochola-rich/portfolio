# ADR-0001: Record architecture decisions

- Status: Accepted
- Date: 2026-09-29

## Context
Several agents and humans will work on the portfolio. Decisions must be discoverable and not silently reversed.

## Decision
Record significant decisions as numbered, immutable ADRs in `docs/adr/` (Michael Nygard format: Context, Decision, Consequences). To change a decision, add a new ADR that supersedes the old one and update the old one's status.

## Consequences
Small overhead per decision; clear history and rationale. Agents must read the ADRs first (see `AGENTS.md`).
