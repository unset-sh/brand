# 0001 — Own the brand contract and its guide

Status: accepted direction, implementation pending review. Date: 2026-11-22.

The owner selected this repository as the source of the shared brand for app,
chat, renderer and documentation, replacing the design-sheet-copy workflow.
The existing mark, fonts and licences remain unchanged. The selected direction
is Graphite neutrals, Pacific/lavender content links, coordinated feedback
colours, Space Grotesk, JetBrains Mono, Tabler icons and Moss & clay syntax.
Artwork is excluded. Provisional choices remain labelled in the contract.

## Boundaries

`src/contract.json` is the editable, queryable source. Build tools validate its
schema, references and contrast pairs and produce static files in `dist/`.
Consumers import public package exports, never build tooling or website code.
Plain CSS and JSON work without Svelte, Tailwind or Hugo. The Tailwind v4 and
shadcn style adapters are optional. Component behaviour stays in the consuming
UI (shadcn-svelte/Bits UI); business rules, network calls, authentication and
data-rendered share cards do not belong in this package.

`site/guide/` contains the Hugo guide; `site/gallery/` contains the Svelte
interactive examples. Both consume the generated package. The website is
assembled into `site/public/`, with the gallery at `components/`, and deployed
by GitHub Pages. Website dependencies are development-only and excluded from
the published npm archive. No second Hugo-specific token source is introduced.

Changesets records release intent. Releases preserve the existing GitHub
Packages registry, tag validation, protected release environment and artifact
attestation. Consumer versions are exact: a release becomes available, then
dependency updates, CI and deployment roll it out. Publishing alone cannot
update previously built applications. Coordinated updates belong in consumer
repositories; this change does not mutate those repositories.

## Structure

| Path | Owner and purpose |
| --- | --- |
| `src/` | Editable contract, schema and shared style adapters |
| `dist/` | Deterministic generated CSS, JSON, syntax and manifest |
| `fonts/`, `logo/`, `icons/` | Pinned reusable assets and their licences |
| `scripts/` | Build, query, provenance and website assembly tooling |
| `checks/` | Contract, package, provenance and boundary verification |
| `site/guide/` | Hugo content, layouts and guide-only interaction |
| `site/gallery/` | Private Svelte examples of the shared contract |
| `guidelines/`, `docs/` | Usage rules, architecture and migration notes |
| `provenance/` | Original sheet manifest and upstream records |
| `.changeset/` | Reviewed release notes and versioning configuration |

The old token shape is a breaking API change and requires a breaking changeset.
No release is implied by this source replacement. The org map is updated in a
companion pull request. Accessibility targets WCAG 2.2 AA; the contrast suite
and gallery checks are evidence, not a whole-product certification.
