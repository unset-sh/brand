The unset.sh mark: three fisheye units (◉◉◉). `unset-mark-source.png` is the original 1080×1080 file as supplied. The SVGs are vectorised from it at its exact geometry (outer radius 110, hole 84, dot 54, centres 304 apart).

The retained digital mark uses Platinum (#F0EDEE) or Onyx (#0A090C). These are fixed asset colours, independent of the current Graphite text tokens:

- `unset-mark-platinum.svg` — Platinum, transparent, cropped tight. Use on `ground` in Dark.
- `unset-mark-onyx.svg` — Onyx, transparent, cropped tight. Use on `ground` in Light.
- `unset-mark-on-onyx.svg` — square 1080 tile, Platinum on Onyx. Avatars and social images.
- `unset-mark-on-platinum.svg` — square 1080 tile, Onyx on Platinum. The inverted avatar.

Pure white and black versions, only for print or places where the palette can't be used:

- `unset-mark-white.svg`, `unset-mark-black.svg` — #FFFFFF / #000000, transparent, cropped tight.
- `unset-mark-on-black.svg`, `unset-mark-on-white.svg` — square 1080 tiles.
- `unset-mark-source.png` — the supplied original; reference only.

Default link preview:

- `unset-link-card.png` — a fixed 1200 × 630 Graphite card with the official mark and `unset.sh` in Space Grotesk. Use the unchanged file when a public page has no content-specific preview. Its package export is `@unset-sh/brand/logo/unset-link-card.png`; suggested image alternative: “Unset — unset.sh”. It has no profile or article data. Data-driven previews remain in `@unset-sh/rendering`.

The card is authored in `scripts/build-link-card.mjs` from the current contract, the pinned font and the unchanged Platinum mark. `bun run asset:link-card` regenerates the image and its provenance using the exact build-only Takumi version. Inspect it before running `bun run build` and `bun run check`. The package ships the static image; consumers do not install or run the renderer. Rebuilding on another platform may change PNG bytes and requires reviewing the resulting asset.

Favicon and app icons: one fisheye unit taken from the mark at its exact geometry, in the palette.

- `unset-favicon.svg` — the unit alone, transparent, with the default black fill. It does not switch with `prefers-color-scheme`; use the PNG alternative when a fixed Onyx background is needed.
- `unset-favicon-32.png`, `unset-favicon-16.png` — Platinum unit filling an Onyx square, for browsers that ignore SVG favicons.
- `unset-apple-touch-icon.png` (180), `unset-icon-192.png`, `unset-icon-512.png` — Platinum unit centred on an Onyx square, for home screens and web app manifests.
- `unset-app-icon.svg` — the source for those three.

In a page head:

```html
<link rel="icon" href="/unset-favicon.svg" type="image/svg+xml">
<link rel="icon" href="/unset-favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/unset-apple-touch-icon.png">
```
