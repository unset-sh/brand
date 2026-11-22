# CLAUDE.md: unset-sh/brand

## Where this repository fits

This repository owns Unset's editable visual contract and public guide. It
publishes static CSS, JSON, fonts, mark and icon assets as `@unset-sh/brand` on
GitHub Packages. The owner superseded the sheet-copy-only workflow in
[decision 0001](docs/decisions/0001-contract-and-guide.md).

- **Belongs here:** contract/schema, generated tokens and optional style adapters,
  pinned assets and provenance, brand guidelines, Hugo guide and private Svelte
  gallery, build/check/release tooling.
- **Does not belong here:** business rules, authentication, data fetching, app
  state or another component behaviour library. Data-rendered previews/share
  cards belong in `unset-sh/presentation`.
- **Uses:** no other org runtime package. Hugo, Svelte, Bits UI, shadcn-svelte,
  Tailwind and related tools build the guide/examples only.
- **Consumers:** presentation and planned app, chat and PDS integrations use
  exact package versions. Do not claim an integration migrated before its own
  changes are verified. Hugo docs can use static assets through a build adapter.
- **Licences:** preserve AGPL-3.0-only project files, OFL-1.1 fonts, reserved
  Unset mark/app icons, MIT Tabler data and vendored upstream notices.
- **Outside contributions:** none for now; do not merge outside contributions.

## Working rules

- `src/contract.json` is editable source. Do not edit `dist/` by hand or duplicate
  the palette in the guide/gallery. Preserve status and provenance.
- Public imports use package exports. Website/tooling stay outside the npm
  archive. The shared package has no runtime dependencies or install hooks.
- Keep interaction behaviour in shadcn-svelte/Bits UI or the consumer. Brand
  adapters style documented markup and states.
- Keep font/icon sources pinned. No runtime CDN, icon font or icon package.
- Use `.nvmrc`, `npm ci`, `npm run build`, `npm run check` and
  `npm run site:build`. Inspect both themes and affected interactions.
- Add a changeset for package changes. Preserve protected publication, tag
  validation and attestation. Pages deploys from `main` only. Never merge your
  own branch or bypass the release gate.
- Work on a task branch, never `main`. Keep commits in the existing style and
  without generated/co-author attribution.

Read <https://github.com/unset-sh/.github/blob/main/MAP.md> before moving
responsibilities. When ownership, dependencies or exports change, open a companion
PR updating `repos.json` and regenerate with `npm run map`; update this section
too. Ask the owner before creating an org repository or relicensing published work.
