#!/usr/bin/env bash
set -euo pipefail

# Match unset-sh/docs. Digest from the official v0.168.0 GitHub release asset.
# https://api.github.com/repos/gohugoio/hugo/releases/tags/v0.168.0
archive="hugo_0.168.0_linux-amd64.tar.gz"
digest="fada83ad56bb27ed4cb7dd81590303bdac16140f944ac4e66fc248117e2d5594"
install_dir="${RUNNER_TEMP:?This installer targets a Linux GitHub Actions runner}/brand-hugo"
mkdir -p "$install_dir"
curl --fail --location --silent --show-error --retry 3 \
  "https://github.com/gohugoio/hugo/releases/download/v0.168.0/$archive" \
  --output "$install_dir/$archive"
printf '%s  %s\n' "$digest" "$install_dir/$archive" | sha256sum --check --strict
tar -xzf "$install_dir/$archive" -C "$install_dir" hugo
"$install_dir/hugo" version
printf '%s\n' "$install_dir" >> "${GITHUB_PATH:?GITHUB_PATH is required}"
