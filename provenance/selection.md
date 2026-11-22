# Source transition

The owner selected the shared contract and its component gallery on 2026-11-22
and authorised replacing the old sheet-copy workflow in this repository.
`docs/decisions/0001-contract-and-guide.md` records the resulting boundaries.

The selected visual direction is typography-led: Graphite neutrals, Pacific
unvisited content links and lavender visited content links, neutral primary
actions, coordinated success/warning/error states, Space Grotesk and JetBrains
Mono, Tabler Icons and Moss & clay syntax. The official mark remains unchanged.
Artwork was explicitly excluded. Values and recipes were developed and visually
reviewed in a local gallery; they are now authored here. This record does not
represent a new byte-for-byte design-sheet export.

Several source IDs in the contract refer here because the initial review used
separate direction, colour, typography and component studies. Those historical
experiments are not package inputs. The current contract is the authoritative
editable form, with provisional decisions identified explicitly.

`design-sheet-0.1.0.json` preserves the original package's historical manifest.
Its hashes describe that release, including files since superseded. It is not
the current integrity manifest. `assets.json` pins the retained mark/font files
and the added Tabler drawing data. Generated `source.json` inventories current
package outputs. Font and mark bytes are retained from the initial repository.

Tabler drawing data is copied from version 3.52.0 (MIT). The reviewed upstream
archive integrity is recorded in `src/contract.json`. Alias maps connect the
gallery's upstream component names to those drawings; they are not new artwork.

shadcn-svelte source is pinned at
`c3b21a62055c7d7b97a220eb5a9efb4d1b7fc8fc`. Vendored components retain upstream
licences. Authored adapters and gallery compositions live outside those files.
