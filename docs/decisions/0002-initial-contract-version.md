# 0002 — Start the contract and guide at 0.1.1

Status: accepted by the owner. Date: 2026-11-22.

The owner selected 0.1.1 for the first shared brand contract and guide release.
The older design-sheet package already occupies 0.1.0. Preserve that package,
release and tag; do not replace published history or start the new system at
1.0.0.

This is a one-time exception to decision 0001's release-numbering requirement.
Changesets applies a patch bump from 0.1.0 to 0.1.1. The public token format and
visual defaults still change incompatibly: the changelog and migration guide
must state that clearly. Consumers use exact versions and migrate explicitly;
loose 0.1.x ranges can accept this release without showing a major version bump.
Future releases follow the normal policy in `.changeset/README.md`.

SemVer permits unstable APIs in initial 0.y.z development; this does not make
the transition backwards compatible. See [SemVer section 4](https://semver.org/#spec-item-4).

Package versioning remains separate from the contract and provenance schema
versions. Generate package metadata and guide labels from `package.json`; do
not change schema versions solely to match the release number.

This decision prepares a release. Publication still requires a reviewed commit
on `main`, a matching tag and the protected release workflow approval. It does
not claim publication or migrate any consuming repository.
