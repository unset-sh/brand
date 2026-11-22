# Brand contract and guide implementation plan

> **For agentic workers:** Use the existing session to implement and delegate independent tasks, then review the integrated result. User approval to replace the repo and use Hugo/GitHub Pages is recorded in the conversation.

**Goal:** Replace the sheet-copy package with the selected, reusable brand contract and a working public guide.

**Architecture:** One static published package; optional framework adapters; separate private Hugo guide and Svelte gallery. Generated assets flow from contract to package to examples, never backwards.

**Tech Stack:** Node 26.12.0, npm lockfile, Changesets, Hugo, Svelte 5, Bits UI, Tailwind v4, GitHub Pages.

**Spec:** `docs/decisions/0001-contract-and-guide.md`.

## Constraints and review focus

- Preserve existing licences and mark/font bytes; pin new upstream sources.
- Missing/cyclic references, duplicate variables and unsafe values fail the build.
- Package consumers require no website/framework runtime dependencies.
- All site paths must work at both `/` and `/brand/`, including fonts and deep links.
- A published version does not silently update consumers; exact versions and CI remain required.

## Tasks

- [x] Port contract to `src/contract.json`, preserve provenance, create deterministic generator and optional style adapters. Test invalid graphs, contrast and generated drift.
- [x] Port the 66-entry gallery to `site/gallery/`, consuming `dist/` and shared asset data. Build and smoke test real interactions.
- [x] Convert the accepted guide to Hugo in `site/guide/`, consuming the same contract; assemble with gallery at `components/`. Test both base paths.
- [x] Define package exports, development-only dependencies and Changesets; test packed contents and consumer imports.
- [x] Update CI and protected release workflow, add GitHub Pages deployment; document architecture, use and migration.
- [x] Update org `repos.json` in a companion branch, regenerate the map, review both diffs and open draft pull requests.
- [x] Validate package checks, website build, browser rendering and final branch review before handoff.

## Review handoff

- Brand replacement: https://github.com/unset-sh/brand/pull/4
- Companion ownership map: https://github.com/unset-sh/.github/pull/4
- Local evidence: `docs/verification.md`. Pages source is GitHub Actions with a main-only environment.
- No merge, package publication or consuming-application migration is included in this handoff.
