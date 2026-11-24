---
title: Brand
description: The shared visual contract for unset.sh, published as the @unset-sh/brand package.
type: docs
cascade:
  type: docs
menus:
  main:
    weight: 60
params:
  doc_kind: overview
---

`unset-sh/brand` owns the unset.sh visual contract: colours, typography, spacing, component styles, icons and the
mark. Apps, chat, the renderer and documentation consume it as the `@unset-sh/brand` package at an exact version.
The [brand guide](https://brand.unset.sh/) demonstrates every value in both themes.

## What the package holds

- `contract.json`: the authored token records, with roles, references, usage and decision status.
- `resolved.json`: the resolved theme values, for renderers and tools.
- `tokens.css`, with the optional `shadcn.css`, `tailwind.css` and `recipes.css` adapters.
- Fonts, the mark, favicon and app icons, and pinned Tabler icon data, each with its licence.

The package is static data, styles and assets. It has no runtime dependency on Hugo, Svelte, Bits UI or Tailwind.

## Use it

1. Point the `@unset-sh` scope at GitHub Packages in the consumer's committed `bunfig.toml`, reading a read-only
   package token from the environment. Never commit the token.
2. Install an exact released version: `bun add --exact @unset-sh/brand@VERSION`. A branch is not a release.
3. Import `@unset-sh/brand/tokens.css` and set `data-theme="light"` or `data-theme="dark"` on the root element;
   dark is the default.

The [repository README](https://github.com/unset-sh/brand#use-the-package) has the full setup for bundlers,
Tailwind v4 with shadcn-svelte, Hugo and renderers. Consumers of 0.1.0 should read the
[migration guide](https://github.com/unset-sh/brand/blob/main/docs/migration.md) first: 0.1.1 changes the token
format incompatibly.

## How it changes

Work lands on `staging`. A release is Alex's merge of `staging` into `main`. When that merge raises the version, the
shared release workflow packs, attests and publishes the package after the `release` approval. Publishing makes a
version available; each consumer then updates its exact dependency and rebuilds. The brand guide redeploys from
`main`.

This section is exported from `docs/site/` in `unset-sh/brand`; edit it there.
