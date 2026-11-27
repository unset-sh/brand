import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { readJson, root } from './repo.mjs';

const pkg = readJson('package.json');
test('identity and existing licence/registry are retained', () => {
  assert.equal(pkg.name, '@unset-sh/brand');
  assert.deepEqual(pkg.publishConfig, { registry: 'https://npm.pkg.github.com' });
  assert.equal(pkg.license, '(AGPL-3.0-only AND OFL-1.1 AND LicenseRef-unset-sh-brand-assets)');
});
test('consumers install no runtime dependencies or lifecycle hooks', () => {
  for (const field of ['dependencies', 'peerDependencies', 'optionalDependencies', 'bundleDependencies', 'bundledDependencies', 'bin', 'engines']) {
    assert.equal(pkg[field], undefined, field);
  }
  for (const hook of ['preinstall', 'install', 'postinstall', 'prepare', 'prepack', 'postpack', 'prepublish', 'prepublishOnly']) {
    assert.equal(pkg.scripts[hook], undefined, hook);
  }
  for (const version of Object.values(pkg.devDependencies)) assert.match(version, /^\d+\.\d+\.\d+(?:-[\w.]+)?$/);
});
test('public exports resolve without any website or tooling imports', async () => {
  for (const [name, path] of Object.entries(pkg.exports)) {
    assert(!/site|scripts|node_modules/.test(path), name);
    assert(existsSync(new URL(path.replace(/\*$/, ''), root)), name);
  }
  const { default: contract } = await import('@unset-sh/brand/contract.json', { with: { type: 'json' } });
  const { default: resolved } = await import('@unset-sh/brand/resolved.json', { with: { type: 'json' } });
  assert.equal(contract.version, pkg.version);
  assert.equal(Object.keys(resolved.themes.dark).length, contract.tokens.length);
});
test('the archive contains only static outputs, assets and documentation', () => {
  // Pack for real into a scratch folder and list the archive, so the test reads what would be published.
  const folder = mkdtempSync(join(tmpdir(), 'brand-pack-'));
  let files;
  try {
    const name = execFileSync('bun', ['pm', 'pack', '--ignore-scripts', '--quiet', '--destination', folder], {
      cwd: fileURLToPath(root), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']
    }).trim().split('\n').at(-1);
    assert(name, 'bun pm pack named no archive');
    files = execFileSync('tar', ['-tzf', join(folder, basename(name))], { encoding: 'utf8' })
      .split('\n').filter(Boolean).map(path => path.replace(/^package\//, ''));
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
  const allowed = /^(dist\/|fonts\/|logo\/|icons\/|guidelines\/|provenance\/|source\.json$|LICENSE$|LICENSE-ASSETS\.md$|README\.md$|CHANGELOG\.md$|THIRD-PARTY-NOTICES\.md$|package\.json$)/;
  for (const path of files) {
    assert.match(path, allowed, path);
    assert(!/\.(m?js|svelte|ts|html)$/.test(path), `Executable file in package: ${path}`);
  }
  for (const required of ['dist/tokens.css', 'dist/contract.json', 'dist/shadcn.css', 'dist/recipes.css', 'dist/syntax/moss-clay-dark.json', 'fonts/SpaceGrotesk-Variable.woff2', 'icons/tabler/LICENSE.md', 'logo/unset-link-card.png', 'LICENSE']) {
    assert(files.includes(required), required);
  }
});
