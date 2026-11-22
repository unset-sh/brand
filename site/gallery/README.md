# Interactive component gallery

The private Svelte application demonstrates all 66 entries in the pinned
shadcn-svelte main catalogue: 44 Unset compositions and 22 upstream examples.
It is built at `/components/` beside the Hugo guide, and excluded from the npm
package. The separate AI Elements catalogue is outside this inventory.

From the repository root, after installing dependencies and building the package:

```sh
node site/gallery/scripts/build-syntax.mjs
npx vite build --config site/gallery/vite.config.js
node --test site/gallery/checks/gallery.test.mjs
```

Set `BRAND_BASE_PATH=/brand/` for a project Pages site; omit it for a root site.
Output is `site/public/components/`. The build resolves fonts, the mark, icon
data and shared CSS from the package; none requires a runtime CDN.

## Boundaries

- `src/catalog.js` is the complete component inventory.
- `src/samples/` contains Unset demo compositions, with local state only.
- `src/lib/registry/ui/` is unchanged upstream component code. `upstream.json`
  pins all 462 files, including 394 Svelte components, to commit
  `c3b21a62055c7d7b97a220eb5a9efb4d1b7fc8fc` of
  [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte).
- `src/lib/components/` adapts upstream icon names to root-owned Tabler data.
- `src/primitives/` contains the supporting pinned shadcn primitives.
- `src/theme.css` imports the exported contract and adapters; only gallery
  framing belongs here. Change shared appearance in the root `src/` files.
- `scripts/build-syntax.mjs` consumes the exported Moss & clay Shiki themes
  and creates five language fixtures with semantic CSS variable references.

The guide and gallery share the `unset-brand-theme` appearance preference.
Specimen navigation and form submissions remain in the demo. The guide link
and official component documentation links navigate normally.

Upstream code retains its MIT licence in `UPSTREAM-LICENSE.md`. Official Tabler
drawings retain `TABLER-LICENSE.md`. The gallery provides useful review surfaces;
it does not establish accessibility conformance for consuming products.
