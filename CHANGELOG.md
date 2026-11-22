# @unset-sh/brand

## 0.1.1

### Patch Changes

- 6a072f9: **Migration required from 0.1.0.** At the owner's request, the first contract and
  guide release is 0.1.1. This initial 0.x transition is incompatible with the old
  token format despite its patch version. Pin an exact version and follow
  `docs/migration.md`; see `docs/decisions/0002-initial-contract-version.md`.

  Replace the sheet-only token format with a versioned brand contract, resolved
  theme data, generated CSS and optional Tailwind/shadcn style adapters. The
  `tokens.json` export now aliases the new contract shape; consumers using the old
  `color.tokens` structure must migrate.

  Adopt Graphite neutrals, Pacific/lavender content-link states, coordinated
  feedback colours, Tabler icon data and Moss & clay syntax. Preserve existing
  mark/font assets and licences. Publish the same contract used by the Hugo brand
  guide and interactive component gallery, with no website runtime dependencies
  in the package. See `docs/migration.md` for consumer changes and rollout steps.

  The guide identifies its contract version and links to release history for
  package availability. Publication status is external state, so the contract
  does not store a fixed `scope.published` flag that becomes stale after release.
