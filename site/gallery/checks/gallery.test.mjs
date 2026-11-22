import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { catalog } from '../src/catalog.js';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('the complete catalogue has unique, local, existing examples', async () => {
  assert.equal(catalog.length, 66);
  assert.equal(new Set(catalog.map(component => component.id)).size, 66);
  assert.equal(catalog.filter(component => component.custom).length, 44);
  for (const component of catalog) {
    const path = component.load.toString().match(/import\("(.+?)"\)/)?.[1];
    assert(path?.startsWith('./'), `Nonlocal example for ${component.id}`);
    assert((await read(`../src/${path}`)).includes('<'), `Empty example for ${component.id}`);
  }
});

test('the vendored shadcn UI stays byte-identical to its pinned upstream', async () => {
  const manifest = JSON.parse(await read('../upstream.json'));
  const files = (await readdir(new URL('../src/lib/registry/ui', import.meta.url), { recursive: true }))
    .filter(path => /\.(svelte|ts|js|json)$/.test(path));
  assert.equal(files.length, manifest.files.length);
  for (const file of manifest.files) {
    const bytes = await readFile(new URL(`../${file.path}`, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), file.sha256, file.path);
  }
});

test('syntax fixtures round-trip and use contract role variables', async () => {
  const { fixtures, samples } = JSON.parse(await read('../src/syntax-samples.json'));
  const contract = JSON.parse(await read('../../../dist/contract.json'));
  const variables = new Set(contract.tokens.map(token => token.cssVariable).filter(Boolean));
  assert.equal(fixtures.length, 5);
  for (const fixture of fixtures) {
    assert.equal(samples[fixture.id].map(line => line.map(token => token.content).join('')).join('\n'), fixture.code);
    for (const token of samples[fixture.id].flat()) {
      const variable = token.style.match(/^color:var\((--syntax-[a-z-]+)\)$/)?.[1];
      assert(variables.has(variable), `Invalid syntax role: ${token.style}`);
    }
  }
});
