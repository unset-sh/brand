# unset.sh brand

The one place the brand foundations of [unset.sh](https://unset.sh) live: the design tokens (colours, type,
spacing), the two fonts, the mark and the icons. Every other repository takes them from here, as the package
`@unset-sh/brand` at one exact version, and keeps no copy of its own.

Nothing is drawn or decided in this repository. Every file it ships is a copy of the unset.sh design sheet, and
[`source.json`](source.json) records the sheet version and the sha256 of each copy. A file that is edited by hand,
added without a pin, or missing fails the checks.

## What belongs here

Fixed files that say what Unset looks like and that never change with anyone's data: the logo and mark, icons,
fonts, colours and type, and later the official avatars and banners, the press kit and print artwork.

What does not belong here:

- Anything **drawn from data**, such as link previews, embeds and share cards. That is
  [`unset-sh/presentation`](https://github.com/unset-sh/presentation), which takes its colours, fonts and mark
  from this package.
- Code that decides or serves anything. That is the app.
- A file that is not in the design sheet. The sheet is where a brand file starts.

## What is here

| Folder | Holds |
| --- | --- |
| [`tokens/`](tokens/) | `tokens.json`: colours for the Dark and Light themes, the type scale, spacing, corners, shadows, stacking, and the mark's geometry |
| [`fonts/`](fonts/) | Space Grotesk and JetBrains Mono as variable web fonts, each with its licence |
| [`logo/`](logo/) | The mark, three fisheyes, as SVG: Platinum and Onyx, cropped and as square tiles, plus the print-only white and black |
| [`icons/`](icons/) | The favicon and the home-screen icons: one unit of the mark |
| [`guidelines/`](guidelines/) | How to use colour, type and the mark ([`brand.md`](guidelines/brand.md)), and which logo file is for what ([`logo.md`](guidelines/logo.md)) |
| [`checks/`](checks/) | The checks CI runs |

Design tokens are the named values a design is built from, such as `ground` for the page background. They have
nothing to do with access tokens.

## Use it

The package is published to GitHub Packages. GitHub asks for an access token to install any package from it, even
a public one, so installing needs a personal access token (classic) with only the `read:packages` scope
([GitHub's npm registry guide](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages)).

In the project's `.npmrc`, which is safe to commit:

```ini
@unset-sh:registry=https://npm.pkg.github.com
```

In your own `~/.npmrc`, never in a repository:

```ini
//npm.pkg.github.com/:_authToken=YOUR_READ_PACKAGES_TOKEN
```

Then install an exact version:

```sh
npm install --save-exact @unset-sh/brand
```

The package holds files, not code:

```js
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import tokens from "@unset-sh/brand/tokens.json" with { type: "json" };

const ground = tokens.color.tokens.find((token) => token.name === "ground").value.dark;
const mark = await readFile(fileURLToPath(import.meta.resolve("@unset-sh/brand/logo/unset-mark-platinum.svg")));
```

`@unset-sh/brand/fonts/…`, `/logo/…` and `/icons/…` resolve to the files in those folders, and
`@unset-sh/brand/source.json` says which design sheet version they came from.

## How it stays in step

```
design sheet  →  this repository (source.json pins every copy)  →  @unset-sh/brand at an exact version  →  every other repository
```

- **Upstream.** The design sheet is where a colour, a font or the mark changes. This repository only copies.
- **Here.** `npm run check` proves every shipped file matches its pin, the tokens are sound (every colour has a
  value in both themes, text pairs reach 4.5:1, the mark files match the geometry the tokens record), the SVGs hold
  nothing but the mark's shapes, and the package holds exactly the pinned files.
- **Downstream.** Repositories depend on one exact version of the package and never copy a file out of it.

## Take a new design sheet version

1. Copy the changed files from the sheet into their folders, byte for byte.
2. In `source.json`, set `sheetVersion`, `copiedAt`, and each changed file's `sha256` **from the sheet's own file
   listing**. Never compute the hash from your copy: that would only prove the copy equals itself.
3. Run `npm run check`.
4. Raise the version in `package.json`: patch for a correction, minor for something added, major when a token,
   file or export is removed or renamed.
5. Open a pull request. One sheet version per pull request.

## Releases

A release is a tag `v<version>` on a commit of `main`. The release workflow checks the tag against `package.json`,
runs the checks, packs the package once, and then waits. Alex approves it in GitHub, and only then is that same
packed file signed and published.

Each release carries a signed statement of which repository, commit and workflow built it. To check a copy you
downloaded:

```sh
gh attestation verify unset-sh-brand-0.1.0.tgz --repo unset-sh/brand
```

## Not here yet

- Official avatars and banners, a press kit and promotional artwork. Each folder is added with its first file.
- Fonts for text beyond Latin. The two fonts cover Latin and Latin Extended-A, so presentation cannot draw
  emoji or Greek, Cyrillic, Vietnamese, Arabic, Hebrew or East Asian text with them. Which fonts fill that gap,
  and whether they live here, is an open decision.
- `icons/unset-favicon.svg` has no colour of its own, so it draws black in every browser theme, although
  `guidelines/logo.md` says it switches between Onyx and Platinum. The file is kept as the sheet has it; the fix
  belongs in the sheet.

## Licences

- Tokens, guidelines and checks: MIT, see [`LICENSE`](LICENSE).
- Fonts: SIL Open Font License 1.1, see the `OFL-*.txt` files in [`fonts/`](fonts/).
- The mark and icons: all rights reserved, with the uses [`LICENSE-ASSETS.md`](LICENSE-ASSETS.md) allows.
