// Changesets heads each changelog entry "## <version>"; tooling's shared release takes its notes from the entry
// headed "## v<version>" and refuses to release without one. `bun run version-packages` runs this after
// `changeset version` to rename every bare version heading to that form. Nothing else in the file changes.
import { readFile, writeFile } from 'node:fs/promises';

/** The changelog with each heading "## 1.2.3" renamed "## v1.2.3". */
export function withReleaseHeadings(changelog) {
  return changelog.replace(/^## (\d+\.\d+\.\d+)[ \t]*$/gm, '## v$1');
}

if (import.meta.main) {
  const file = new URL('../CHANGELOG.md', import.meta.url);
  const before = await readFile(file, 'utf8');
  const after = withReleaseHeadings(before);
  if (after !== before) await writeFile(file, after);
}
