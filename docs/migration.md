# Migrating from the design-sheet package

**0.1.1 introduces the new brand contract and guide.** At the owner's request,
this initial 0.x transition uses 0.1.1. It changes the public token format and
visual defaults incompatibly with 0.1.0; consumers must migrate and pin an exact
version. See [decision 0002](decisions/0002-initial-contract-version.md).

Do not treat the patch number as a compatibility guarantee. Ranges such as
`^0.1.0` and `~0.1.0` can admit this release; review and replace loose ranges
before updating. Keep the existing 0.1.0 package and tag for historical users.

The sheet remains historical provenance. New decisions are authored in
`src/contract.json`, validated, and compiled into `dist/`. Token records have
stable IDs, semantic references, theme values, usage and decision status.

| Previous use | Replacement |
| --- | --- |
| `tokens.json` with `color.tokens` | `contract.json` for authored records; `resolved.json` for resolved values |
| `tokens.json` export | Alias to the **new** contract, not a compatibility conversion |
| Sheet-only `source.json` | Current build/asset provenance; original manifest retained in `provenance/` |
| Hand-copied CSS | `tokens.css` and optional `shadcn.css`, `tailwind.css`, `recipes.css` imports |
| Generic `plum`, `cyan`, `emerald` roles | Semantic links, success, warning, danger and neutral actions |
| Iconoir | Pinned Tabler drawing data and mappings |
| ASCII controls, cut corners, hard shadows | Current component recipes |

Font/mark names remain under `fonts/*` and `logo/*`; favicon/app icons remain
under `icons/*`, with their existing licences. Check font coverage for each
renderer and supported language; the retained font slices are not expanded.

## Consumer migration

1. Install an exact **released** version and commit the lockfile update. A
   repository branch is not a package release.
2. Replace old token lookups and copied values with public package imports.
   Tailwind v4 uses the optional adapter. Hugo copies/mounts static CSS/assets
   at build time, preserving relative font paths. Renderers can consume JSON
   and font files directly without a browser framework.
3. Replace icon mappings with Tabler data. Label icon-only controls and hide
   decorative SVG from assistive technology.
4. Compare consuming shadcn markup/version with the gallery. Shared CSS does
   not update copied component source or supply its behaviour.
5. Check both themes, visited links, feedback, keyboard/focus, text resizing and
   small screens before rebuilding and deploying.

Pacific/lavender belong to unvisited/visited content links only. Primary actions,
information, selection and focus stay neutral. Success, warning and danger use
separate semantic families. Inspect old generic cyan info/plum error usages.

## Release and rollout

`npm run changeset` records intent. `npm run version-packages` applies reviewed
changesets to version/changelog files. Rebuild before the release PR. Existing
main/tag validation, release-environment approval and artifact attestation remain.

Configure dependency automation in each consumer repository to open update PRs.
Consumer CI and deployment still run there: publishing does not change an
already built application. Coordinated rollout means approving the same package
version across app, chat, renderer and docs, then deploying those builds. No
mutable runtime `latest` theme is fetched.

The guide demonstrates repository source on `main`; a consumer may still use an
older release. Compare the displayed contract/package version when reviewing it.
The contract version identifies its contents, not registry availability. Check
the package registry and release workflow when selecting an installable version;
publication status is not stored as a fixed boolean in the contract.
