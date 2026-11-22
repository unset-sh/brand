---
"@unset-sh/brand": major
---

Replace the sheet-only token format with a versioned brand contract, resolved
theme data, generated CSS and optional Tailwind/shadcn style adapters. The
`tokens.json` export now aliases the new contract shape; consumers using the old
`color.tokens` structure must migrate.

Adopt Graphite neutrals, Pacific/lavender content-link states, coordinated
feedback colours, Tabler icon data and Moss & clay syntax. Preserve existing
mark/font assets and licences. Publish the same contract used by the Hugo brand
guide and interactive component gallery, with no website runtime dependencies
in the package. See `docs/migration.md` for consumer changes and rollout steps.
