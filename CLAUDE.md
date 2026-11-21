# CLAUDE.md: unset-sh/brand

## Where this repository fits

This is `unset-sh/brand`: the fixed files that say what unset.sh looks like (design tokens, the two fonts, the mark
and icons, and the guidelines for using them), as pinned copies of the design sheet, published as `@unset-sh/brand`
(data only) on GitHub Packages.

- **Belongs here:** files copied byte for byte from the design sheet and pinned in `source.json`, and the guidelines.
- **Does not belong here:** anything drawn from data, such as link previews and share cards (that is
  `unset-sh/presentation`); code that decides or serves anything (that is `Undefined6799/unset`); a file that is not
  in the design sheet yet (it starts in the sheet).
- **Uses:** nothing. **Used by:** `unset-sh/presentation`, and `Undefined6799/unset` after its rewrite, each at an
  exact version.

- **Licence:** everything written for unset.sh is AGPL-3.0-only; work we use from others keeps its own licence. The
  fonts are third-party (OFL-1.1). The licence for the files here is not settled yet; changing it needs the owner.

The map of every unset.sh repository is <https://github.com/unset-sh/.github/blob/main/MAP.md>. Read it before
moving work between repositories or starting work that might belong elsewhere.

**Keep the map current.** When a change here adds, removes or moves a responsibility, changes what this repository
uses or ships, or renames or archives it, open a pull request on `unset-sh/.github` that updates `repos.json` (run
`npm run map` there) and update this section to match. Ask the owner before creating any new repository in the
organisation, and before changing the licence of anything already published.
