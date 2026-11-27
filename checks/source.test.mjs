import assert from 'node:assert/strict';
import test from 'node:test';
import { readJson, sha256, filesIn, PINNED_FOLDERS } from './repo.mjs';

const source = readJson('source.json');
test('current provenance names the repository contract and preserves the old sheet record', () => {
  assert.equal(source.authority, 'src/contract.json');
  assert.equal(source.contractSha256, sha256('src/contract.json'));
  assert.equal(source.version, readJson('package.json').version);
  assert.match(readJson(source.historical).sheetUrl, /^https:\/\/claude\.ai\/artifact\//);
});
test('all current asset and generated output hashes match', () => {
  assert.equal(new Set(source.files.map(f => f.path)).size, source.files.length);
  for (const file of source.files) assert.equal(sha256(file.path), file.sha256, file.path);
});
test('the complete asset inventory is pinned', () => {
  const assets = readJson('provenance/assets.json');
  assert.deepEqual(assets.files.map(f => f.path).sort(), PINNED_FOLDERS.flatMap(filesIn).sort());
  for (const asset of assets.files) assert.equal(sha256(asset.path), asset.sha256, asset.path);
});
test('all original fonts, marks, app icons and licences retain their exact bytes', () => {
  const old = readJson('provenance/design-sheet-0.1.0.json');
  for (const asset of old.files.filter(f => /^(fonts|logo|icons)\//.test(f.path))) {
    assert.equal(sha256(asset.path), asset.sha256, asset.path);
  }
});
test('the standard link card records its source artwork, font and current brand colours', () => {
  const card = readJson('provenance/unset-link-card.json');
  for (const input of card.inputs) assert.equal(sha256(input.path), input.sha256, input.path);
  const colours = readJson('dist/resolved.json').themes[card.theme];
  for (const [token, value] of Object.entries(card.tokens)) assert.equal(colours[token], value, token);
  assert.equal(card.renderer, `@takumi-rs/core@${readJson('package.json').devDependencies['@takumi-rs/core']}`);
});
