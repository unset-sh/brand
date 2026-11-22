import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createResolver, checkContrast } from './lib/contract.mjs';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFile(resolve(root, path), 'utf8');
const json = value => JSON.stringify(value, null, 2) + '\n';
const hash = value => createHash('sha256').update(value).digest('hex');

export async function generate() {
  const authored = await read('src/contract.json');
  const schema = JSON.parse(await read('src/contract.schema.json'));
  const pkg = JSON.parse(await read('package.json'));
  const contract = { ...JSON.parse(authored), $schema: './contract.schema.json', version: pkg.version };
  const value = createResolver(contract, schema);
  const contrast = checkContrast(contract, value);
  const assets = JSON.parse(await read('provenance/assets.json'));
  for (const asset of assets.files) {
    const path = resolve(root, asset.path);
    if (!path.startsWith(root + '/') || hash(await readFile(path)) !== asset.sha256) {
      throw new Error(`Asset provenance mismatch: ${asset.path}`);
    }
  }
  for (const source of contract.sources.filter(s => s.path)) {
    const path = resolve(root, source.path);
    if (!path.startsWith(root + '/')) throw new Error(`Source outside repository: ${source.path}`);
    const bytes = await readFile(path);
    if (source.sha256 && hash(bytes) !== source.sha256) throw new Error(`Source hash mismatch: ${source.path}`);
  }
  const cssTokens = contract.tokens.filter(token => token.cssVariable);
  const declarations = theme => cssTokens.map(token => `  ${token.cssVariable}: ${value(token.id, theme, true)};`).join('\n');
  const faces = contract.typography.families.map(family => {
    const source = contract.sources.find(source => source.id === family.assetSourceId);
    if (!source?.path?.startsWith('fonts/') || !source.path.endsWith('.woff2') || !source.sha256) {
      throw new Error(`Missing pinned WOFF2 font: ${family.name}`);
    }
    if (/[;{}<>]/.test(family.name + family.weights + family.style + family.loading)) throw new Error('Unsafe font metadata');
    return `@font-face {font-family:${JSON.stringify(family.name)};src:url(${JSON.stringify('../' + source.path)}) format("woff2");font-weight:${family.weights};font-style:${family.style};font-display:${family.loading};}`;
  }).join('\n');
  const banner = `/* Generated from src/contract.json (${pkg.version}). Run npm run build; do not edit. */\n`;
  const css = `${banner}${faces}\n:root {\n  color-scheme: dark;\n${declarations('dark')}\n}\n:root[data-theme="light"] {\n  color-scheme: light;\n${declarations('light')}\n}\n`;
  const tailwindEntries = cssTokens.flatMap(token => {
    if (token.type === 'color') return [`  --color-${token.cssVariable.slice(2)}: var(${token.cssVariable});`];
    if (/^--(font|radius)-/.test(token.cssVariable)) return [`  ${token.cssVariable}: var(${token.cssVariable});`];
    return [];
  });
  const outputs = new Map([
    ['dist/tokens.css', css],
    ['dist/tailwind.css', `${banner}@theme inline {\n${tailwindEntries.join('\n')}\n}\n`],
    ['dist/contract.json', json(contract)],
    ['dist/contract.schema.json', json(schema)],
    ['dist/recipes.css', await read('src/recipes.css')],
    ['dist/shadcn.css', `${await read('src/adapters/shadcn.css')}\n@layer base {\n${await read('src/adapters/style-vega.css')}\n}\n${await read('src/adapters/typeset.css')}\n${await read('src/adapters/extensions.css')}`],
    ['dist/SHADCN-LICENSE.md', await read('src/adapters/LICENSE.md')],
    ['dist/meta.json', json({ version: pkg.version, sans: contract.typography.families[0].name, mono: contract.typography.families[1].name, icons: contract.icons.family })],
    ['dist/resolved.json', json({ version: pkg.version, themes: Object.fromEntries(['light', 'dark'].map(theme => [theme, Object.fromEntries(contract.tokens.map(token => [token.id, value(token.id, theme)]))])) })],
    ['dist/contrast-checks.json', json({ scope: 'Authored text colour pairs only; not a complete accessibility audit.', checks: contrast })]
  ]);
  const scopes = JSON.parse(await read('src/syntax-scopes.json'));
  const themes = {};
  for (const theme of ['light', 'dark']) {
    themes[theme] = {
      name: `unset-moss-clay-${theme}`, displayName: `Unset Moss & clay ${theme}`, type: theme,
      colors: { 'editor.background': value('code.background', theme), 'editor.foreground': value('code.foreground', theme) },
      tokenColors: scopes.map(({ role, scope }) => ({
        ...(scope ? { scope } : {}),
        settings: { foreground: value(`code.${role}`, theme), ...(!scope ? { background: value('code.background', theme) } : {}), fontStyle: '' }
      }))
    };
    outputs.set(`dist/syntax/moss-clay-${theme}.json`, json(themes[theme]));
  }
  outputs.set('dist/syntax/moss-clay.json', json({ id: 'moss-clay', label: 'Moss & clay', version: pkg.version, shiki: themes }));
  const source = {
    schemaVersion: 2, version: pkg.version, authority: 'src/contract.json',
    contractSha256: hash(authored), historical: 'provenance/design-sheet-0.1.0.json',
    files: [...assets.files, ...[...outputs].map(([path, bytes]) => ({ path, sha256: hash(bytes), origin: 'repository-build' }))]
  };
  outputs.set('source.json', json(source));
  outputs.set('dist/source.json', json(source));
  return outputs;
}

export async function build({ check = false } = {}) {
  const outputs = await generate();
  if (check) {
    for (const [path, expected] of outputs) {
      let actual;
      try { actual = await read(path); } catch { throw new Error(`Missing generated file: ${path}; run npm run build`); }
      if (actual !== expected) throw new Error(`Generated drift: ${path}; run npm run build`);
    }
    const entries = await readdir(resolve(root, 'dist'), { recursive: true, withFileTypes: true });
    for (const entry of entries.filter(entry => entry.isFile())) {
      const path = relative(root, resolve(entry.parentPath, entry.name));
      if (!outputs.has(path)) throw new Error(`Unexpected generated file: ${path}`);
    }
  } else {
    for (const [path, content] of outputs) {
      await mkdir(dirname(resolve(root, path)), { recursive: true });
      await writeFile(resolve(root, path), content);
    }
  }
  console.log(`${check ? 'Verified' : 'Generated'} ${outputs.size} package files.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await build({ check: process.argv.includes('--check') });
}
