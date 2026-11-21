The unset.sh mark: three fisheye units (◉◉◉). `unset-mark-source.png` is the original 1080×1080 file as supplied. The SVGs are vectorised from it at its exact geometry (outer radius 110, hole 84, dot 54, centres 304 apart).

The mark is always drawn in the palette, Platinum (#F0EDEE) or Onyx (#0A090C), the same as `ink`:

- `unset-mark-platinum.svg` — Platinum, transparent, cropped tight. Use on `ground` in Dark.
- `unset-mark-onyx.svg` — Onyx, transparent, cropped tight. Use on `ground` in Light.
- `unset-mark-on-onyx.svg` — square 1080 tile, Platinum on Onyx. Avatars and social images.
- `unset-mark-on-platinum.svg` — square 1080 tile, Onyx on Platinum. The inverted avatar.

Pure white and black versions, only for print or places where the palette can't be used:

- `unset-mark-white.svg`, `unset-mark-black.svg` — #FFFFFF / #000000, transparent, cropped tight.
- `unset-mark-on-black.svg`, `unset-mark-on-white.svg` — square 1080 tiles.
- `unset-mark-source.png` — the supplied original; reference only.

Favicon and app icons: one fisheye unit taken from the mark at its exact geometry, in the palette.

- `unset-favicon.svg` — the unit alone, transparent; Onyx in light browser UI, Platinum in dark (it switches itself with `prefers-color-scheme`). The main favicon.
- `unset-favicon-32.png`, `unset-favicon-16.png` — Platinum unit filling an Onyx square, for browsers that ignore SVG favicons.
- `unset-apple-touch-icon.png` (180), `unset-icon-192.png`, `unset-icon-512.png` — Platinum unit centred on an Onyx square, for home screens and web app manifests.
- `unset-app-icon.svg` — the source for those three.

In a page head:

```html
<link rel="icon" href="/unset-favicon.svg" type="image/svg+xml">
<link rel="icon" href="/unset-favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/unset-apple-touch-icon.png">
```
