# Changesets

Run `npm run changeset` for published-package changes. Describe the resulting
consumer behaviour and choose patch, minor or major. Removing a public role,
changing JSON shape or incompatible component-markup requirements needs a major
changeset. Guide-only edits do not need a package release.

The owner selected **0.1.1** for the initial contract and guide release as an
explicit exception to that policy. It is an incompatible transition from the
old 0.1.0 token format, not a backwards-compatible fix. See
[decision 0002](../docs/decisions/0002-initial-contract-version.md) and the
[migration guide](../docs/migration.md). Existing tags and packages are retained.

Run `npm run version-packages` in a release branch to apply reviewed changesets
and generate the version/changelog, then regenerate and check outputs. Commit
those changes through a PR before tagging `main`.

Publication stays in the protected `release` workflow. Do not run `changeset
publish` as a shortcut. The registry remains GitHub Packages; visibility is
managed there. See [configuration](https://changesets.dev/guide/config) and the
[version command](https://changesets.dev/guide/cli#version).
