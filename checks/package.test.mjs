import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
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
  const args = ['pack', '--dry-run', '--json', '--ignore-scripts', '--cache', process.env.TMPDIR || '/tmp'];
  const npm = process.env.npm_execpath;
  const result = execFileSync(npm ? process.execPath : 'npm', npm ? [npm, ...args] : args, {
    cwd: fileURLToPath(root), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']
  });
  const files = JSON.parse(result)[0].files.map(f => f.path);
  const allowed = /^(dist\/|fonts\/|logo\/|icons\/|guidelines\/|provenance\/|source\.json$|LICENSE$|LICENSE-ASSETS\.md$|README\.md$|CHANGELOG\.md$|THIRD-PARTY-NOTICES\.md$|package\.json$)/;
  for (const path of files) {
    assert.match(path, allowed, path);
    assert(!/\.(m?js|svelte|ts|html)$/.test(path), `Executable file in package: ${path}`);
  }
  for (const required of ['dist/tokens.css', 'dist/contract.json', 'dist/shadcn.css', 'dist/recipes.css', 'dist/syntax/moss-clay-dark.json', 'fonts/SpaceGrotesk-Variable.woff2', 'icons/tabler/LICENSE.md', 'LICENSE']) {
    assert(files.includes(required), required);
  }
});
