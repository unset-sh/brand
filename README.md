# unset.sh brand

The shared visual contract for unset.sh: colours, typography, spacing, component
styles, icons and the mark. App, chat, renderer and documentation can consume
`@unset-sh/brand` at an exact version. This repository owns the values and the
guide that demonstrates them.

This source replacement breaks the original sheet-only token shape. See
[migration](docs/migration.md) and the [Changesets release policy](.changeset/README.md).
A merged guide update is not a published package release or an application migration.

## Architecture

```text
src/contract.json → validation + generation → dist/ → @unset-sh/brand
                                              ├── app / chat / renderer
                                              └── Hugo guide + Svelte gallery
```

| Path | Responsibility |
| --- | --- |
| `src/` | Editable contract, schema and shared style adapters |
| `dist/` | Generated public CSS, JSON, syntax theme and manifest |
| `fonts/`, `logo/`, `icons/` | Pinned assets and their licences |
| `site/guide/` | Hugo content, templates and guide interactions |
| `site/gallery/` | Interactive Svelte examples at `/components/` |
| `scripts/`, `checks/` | Build tooling and contract/package checks |
| `guidelines/`, `docs/` | Usage, architecture and migration |
| `provenance/` | Original sheet manifest and upstream records |
| `.changeset/` | Reviewed release intent and versioning configuration |

The package contains static data, styles and assets, with no runtime dependency
on Hugo, Svelte, Bits UI or Tailwind. Website and tooling are excluded from the
npm archive. [Decision 0001](docs/decisions/0001-contract-and-guide.md) defines the boundaries.

[Bits UI](https://www.bits-ui.com/docs/introduction) supplies headless interaction
primitives; [shadcn-svelte](https://www.shadcn-svelte.com/docs/components) supplies
component code. Unset styles that code through tokens and optional adapters.
Product rules, authentication, network calls and data rendering remain with the
consumer. The brand package does not duplicate component behaviour.

## Use the package

Configure the scope in the consumer's committed `.npmrc`:

```ini
@unset-sh:registry=https://npm.pkg.github.com
```

Provide read-only package credentials through user configuration or CI secrets,
never a committed file. See [GitHub registry authentication](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).
Install an intended published version with `npm install --save-exact
@unset-sh/brand@VERSION`, replacing `VERSION` with that version.

For a bundler-based application:

```css
@import "@unset-sh/brand/tokens.css";
html { background: var(--ground); color: var(--ink); }
body { font-family: var(--font-sans); }
a { color: var(--link); }
a:visited { color: var(--link-visited); }
```

Set `data-theme="light"` or `data-theme="dark"` on the root element; dark is the
default. CSS includes font declarations. Let the bundler resolve relative font
URLs; static Hugo copies must preserve the CSS file's `../fonts/` directory.

For Tailwind v4 and shadcn-svelte:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@unset-sh/brand/tokens.css";
@import "@unset-sh/brand/shadcn.css";
@import "@unset-sh/brand/tailwind.css";
@import "@unset-sh/brand/recipes.css";
```

The optional shadcn adapter targets the pinned Vega markup used in the gallery.
Install `tw-animate-css` in a Tailwind consumer and put `class="style-vega"` on
the root element. Add `data-recipes="true"` to opt into the additional recipes.
Use `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));`
when consuming dark variants.

Recipes style documented markup and states. Check the consuming component
version and markup; CSS does not update copied shadcn source or its behaviour.

For a renderer or tool:

```js
import contract from "@unset-sh/brand/contract.json" with { type: "json" };
const linkRole = contract.tokens.find(token => token.id === "color.link");
```

`contract.json` records roles, references, usage and decision status.
`resolved.json` provides resolved theme values; `contract.schema.json` describes
the shape; `source.json` records build/asset provenance. Asset exports are
`fonts/*`, `logo/*`, `icons/*`; the syntax export is `syntax/moss-clay.json`.

## Change and verify

Use Node from `.nvmrc` and Hugo **0.168.0**, matching the docs site.

```sh
npm ci
npm run build
npm run check
npm run site:build
```

Serve `site/public/` for a local preview. `HUGO_BINARY` can name an executable
outside `PATH`. Test project Pages paths with `BRAND_BASE_PATH=/brand/`;
`BRAND_BASE_URL` supplies the absolute URL for the assembled guide and gallery.

Edit `src/contract.json` and shared `src/` style adapters, then rebuild. Inspect
both themes and affected components, including keyboard and small-screen use.
Add a changeset with `npm run changeset` for package changes and open a PR with
generated outputs and validation. Guide-only edits need no package version bump.

WCAG 2.2 AA is the target. Automated contrast checks cover authored pairs, not
whole-product certification. Integrations still need labels, keyboard, focus,
reflow, screen-reader and state checks.

## Releases and consistency

`npm run version-packages` applies reviewed changesets to version/changelog
files. Regenerate outputs and review that release commit before tagging. Do not
manually edit semver or bypass publication controls with `changeset publish`.
See the [Changesets version command](https://changesets.dev/guide/cli#version).

A release is a `v<version>` tag on `main`. CI validates the tag, checks and packs
once, then waits for the protected `release` environment. That same artifact is
attested and published to GitHub Packages. Existing licences and approval remain.

Publishing makes a version available; it does not change an already built app.
Each consumer updates its exact dependency and lockfile, runs checks and
rebuilds/deploys. Consumer-side dependency bots can open update PRs automatically.
A coordinated rollout uses the same approved version across surfaces. Runtime
fetching of a mutable `latest` theme is outside this contract.

## GitHub Pages

The `pages` workflow builds Hugo and the Svelte gallery together and deploys
`site/public/` after changes reach `main`. Manual runs also require `main`. The
Pages-provided URL supports the default project path or a future custom domain.

Set repository **Settings → Pages → Source** to **GitHub Actions**. The
`github-pages` environment should allow `main` only; it is separate from the
protected npm `release` environment. See [custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Licences and remaining decisions

- Original project files remain **AGPL-3.0-only**; see [LICENSE](LICENSE).
- Font files retain **OFL-1.1**; see `fonts/OFL-*.txt`.
- Unset's mark/favicon/app icons retain [LICENSE-ASSETS.md](LICENSE-ASSETS.md).
- [Tabler Icons](https://tabler.io/icons) retain **MIT**, with included notice.
- Vendored shadcn-svelte code retains its included upstream licence.

Retained font slices do not cover every script. Do not synthesize unavailable
italic variants. Final heading-scale and renderer typography remain provisional
where the contract says so. Official mark geometry is preserved; see
[logo usage](guidelines/logo.md).
