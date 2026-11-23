import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { withReleaseHeadings } from '../scripts/changelog-heading.mjs';
import { readJson, root } from './repo.mjs';

test('the released version has the changelog entry the shared release reads', () => {
  const { version } = readJson('package.json');
  const changelog = readFileSync(new URL('CHANGELOG.md', root), 'utf8');
  assert.ok(changelog.split('\n').some(line => line.trim() === `## v${version}`), `CHANGELOG.md has no "## v${version}"`);
});

test('bare changesets version headings are renamed, and nothing else', () => {
  const text = '# @unset-sh/brand\n\n## 0.1.2\n\n### Patch Changes\n\n- 0.1.2 is a note, not a heading\n\n## v0.1.1\n';
  assert.equal(withReleaseHeadings(text), text.replace('## 0.1.2\n', '## v0.1.2\n'));
  assert.equal(withReleaseHeadings(withReleaseHeadings(text)), withReleaseHeadings(text));
});
