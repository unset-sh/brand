# CLAUDE.md: unset-sh/brand

## Where this repository fits

This is `unset-sh/brand`: Unset's editable visual contract and public guide, published as static CSS, JSON,
fonts, mark and icon assets in `@unset-sh/brand` on GitHub Packages. The owner superseded the sheet-copy-only
workflow in [decision 0001](docs/decisions/0001-contract-and-guide.md).

- **Belongs here:** contract/schema, generated tokens and optional style adapters, pinned assets and provenance,
  brand guidelines, the Hugo guide and private Svelte gallery, build/check/release tooling.
- **Does not belong here:** business rules, authentication, data fetching, app state or another component
  behaviour library (that is the consumer: `unset-sh/web`, `unset-sh/backend`); previews and share cards drawn
  from data (that is `unset-sh/rendering`); shared workflow implementations (that is `unset-sh/tooling`).
- **Uses:** no other organisation runtime package; `unset-sh/tooling` for the branch policy check at a full
  commit; `unset-sh/agent-kit` as the copy under `.claude/`. Hugo, Svelte, Bits UI, shadcn-svelte, Tailwind and
  related tools build the guide and gallery only. **Used by:** rendering, docs, and planned web and PDS
  integrations, at exact package versions. Do not claim an integration migrated before its own changes are
  verified.
- **Licence:** project files follow the organisation rule (AGPL-3.0-only). Preserve OFL-1.1 fonts, the reserved
  Unset mark and app icons, MIT Tabler data and vendored upstream notices.

The map of every unset.sh repository is <https://github.com/unset-sh/.github/blob/main/MAP.md>. Read it before
moving work between repositories or starting work that might belong elsewhere.

**Keep the map current.** When a change here adds, removes or moves a responsibility, changes what this
repository uses or ships, or renames or archives it, open a pull request on `unset-sh/.github` that updates
`repos.json` (run `npm run map` there) and update this section to match.

## Rules

- `src/contract.json` is editable source. Do not edit `dist/` by hand or duplicate the palette in the guide or
  gallery. Preserve status and provenance.
- Public imports use package exports. Website and tooling stay outside the package archive. The shared package
  has no runtime dependencies or install hooks.
- Keep interaction behaviour in shadcn-svelte/Bits UI or the consumer. Brand adapters style documented markup
  and states.
- Keep font and icon sources pinned. No runtime CDN, icon font or icon package.
- Bun is the runtime and package manager (`.bun-version`, `bun.lock`, `bunfig.toml`, 7-day release age). Inspect
  both themes and affected interactions.
- Add a changeset for package changes. Preserve protected publication, version validation and attestation.
  Pages deploys from `main` only.
- Outside contributions: none for now; do not merge them.

## Commands

```sh
bun install
bun run build
bun run check        # generated files, syntax examples, tests, and the agent-kit copy check
bun run site:build   # needs Hugo 0.168.0
```
