# Brand guide

Hugo renders the written guide and its specimens. The interactive Svelte gallery
is built independently and assembled at `components/`; Hugo has no dependency
on Svelte, Tailwind, or Bits UI.

The homepage introduction is Markdown in `content/_index.md`. The seven visual
sections live in `layouts/_partials/sections/`. Guide layout styles and small
theme, menu, token-search and copy interactions live in `assets/guide/`. Hugo fingerprints these CSS and JavaScript files so
a deployment receives new asset URLs when their content changes.

`hugo.toml` mounts generated `dist/` into both Hugo data and public assets. It
also mounts the package's original fonts, logo and icon assets. No token values,
font files or icon drawings are copied into this directory.

Run the repository's package generator before the guide build. The complete
website build runs `scripts/build-guide.mjs` and the gallery build. For the guide
alone, use `node scripts/build-guide.mjs` from the repository root.

- Hugo is pinned to **0.168.0**, matching the organisation's documentation build.
- `HUGO_BINARY` selects a local executable; otherwise `hugo` must be on `PATH`.
- `BRAND_BASE_PATH=/brand/` supports GitHub project Pages; `/` supports a custom
  domain or local preview. `BRAND_BASE_URL` optionally supplies the full origin.
- Default output is `site/public/`. It is generated and must not be committed.

All public URLs use Hugo's `relURL` with no leading slash. CSS font paths stay
relative to the package's directory structure. This keeps both root and project
Pages deployments usable without rewriting generated brand files.

References: [Hugo module mounts](https://gohugo.io/configuration/module/#mounts),
[relative URLs](https://gohugo.io/functions/urls/relurl/),
[GitHub Pages deployment](https://gohugo.io/host-and-deploy/deploy-to-github-pages/).
