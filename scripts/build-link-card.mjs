// Fixed identity artwork, not a data-driven preview. Takumi 2.21.0's local API is
// documented in node_modules/@takumi-rs/core/README.md and dist/export.d.mts.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Renderer } from '@takumi-rs/core';
import { createResolver } from './lib/contract.mjs';

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const contract = JSON.parse(await read('src/contract.json'));
const value = createResolver(contract, JSON.parse(await read('src/contract.schema.json')));
const family = contract.typography.families[0];
const font = contract.sources.find(source => source.id === family.assetSourceId);
const markPath = 'logo/unset-mark-platinum.svg';
const mark = await read(markPath);
const markKey = hash(mark);
const renderer = new Renderer();
await renderer.registerFont({ name: family.name, data: await read(font.path) });

const prepared = await renderer.prepare({
  type: 'container',
  style: {
    width: 1200, height: 630, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: value('color.ground', 'dark'), gap: 44,
  },
  children: [
    { type: 'image', src: markKey, style: { width: 248.4, height: 66 } },
    { type: 'text', text: 'unset.sh', style: {
      fontFamily: family.name, fontWeight: 600, fontSize: 96, lineHeight: 1,
      letterSpacing: -3.84, color: value('color.ink', 'dark'),
    } },
  ],
}, {
  width: 1200, height: 630, fontFamilies: [],
  images: [{ src: markKey, data: mark, cache: 'none' }],
});

const png = await renderer.render(prepared, { format: 'png' });
const path = 'logo/unset-link-card.png';
await writeFile(new URL(path, root), png);
const assets = JSON.parse(await read('provenance/assets.json'));
assets.files = assets.files.filter(asset => asset.path !== path);
assets.files.push({ path, sha256: hash(png), origin: 'scripts/build-link-card.mjs' });
assets.files.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
await writeFile(new URL('provenance/assets.json', root), JSON.stringify(assets, null, 2) + '\n');
await writeFile(new URL('provenance/unset-link-card.json', root), JSON.stringify({
  path, width: 1200, height: 630, theme: 'dark', text: 'unset.sh',
  renderer: '@takumi-rs/core@2.21.0',
  inputs: await Promise.all(['scripts/build-link-card.mjs', markPath, font.path].map(async path => ({ path, sha256: hash(await read(path)) }))),
  tokens: { 'color.ground': value('color.ground', 'dark'), 'color.ink': value('color.ink', 'dark') },
}, null, 2) + '\n');
console.log(`Generated ${path}. Inspect the image, then run bun run build and bun run check.`);
