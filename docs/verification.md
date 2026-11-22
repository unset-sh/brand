# Migration verification

Checked on 2026-11-22, before publication.

- `npm ci --ignore-scripts --offline` succeeds from the committed lockfile.
- `npm run check`: 41 passing tests, including schema/reference failures,
  generated drift, package boundaries, asset hashes and a separate Tailwind
  consumer compiling the public exports with both local fonts.
- 188 token records produce 135 CSS variables. All 66 authored text contrast
  pairs pass 4.5:1 in their intended theme and surface.
- The gallery contains all 66 main entries: 44 Unset compositions and 22 direct
  upstream examples. Its 462 upstream UI files, including 394 Svelte components,
  match the pinned upstream hashes. This count does not mean every possible
  component variant has been tested.
- Hugo 0.168.0 and the Vite gallery build at `/` and `/brand/`. The integrated
  build also accepts the slashless base path emitted by `configure-pages`.
- Browser checks cover guide theme switching, token lookup/copy, section
  highlighting, shared fonts/icons, gallery links, Moss & clay code, dialog
  initial focus/Escape return and toast geometry. Status icons are 20px; close
  targets are 32px. No console errors were observed in these checks.
- Guide CSS and JavaScript use content hashes and integrity attributes so
  deployments cannot retain a previous script/style under the same URL.
- Changesets prepares 0.1.1 as selected by the owner, updates the package and
  lockfile, consumes the changeset and creates the changelog. Regenerated
  metadata uses 0.1.1 throughout; schema versions and historical 0.1.0 asset
  provenance are unchanged. All 41 checks pass for the prepared version.
  No package was published during validation; the protected release gate remains.
- The 0.1.1 archive includes the migration warning and matching package,
  contract, syntax and provenance versions. The custom-domain website build
  displays v0.1.1 and keeps component links relative to the site root.
- The org-map companion passes its 22 tests and generated-map drift check.

The original font, logo and app-icon bytes and existing licences are retained.
The package has no consumer runtime dependencies or install hooks. Hugo and
Svelte build tooling are development-only; the packed artifact excludes them.

These checks do not certify complete WCAG conformance or migrate any consuming
application. Final heading-scale and renderer typography decisions remain
explicitly provisional. Consumer-specific markup, accessibility and deployment
still need verification when adopting the released package.
