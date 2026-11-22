import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const root = fileURLToPath(new URL('../', import.meta.url));

test('the documented Tailwind consumer compiles public exports and local font URLs', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  const section = readme.split('For Tailwind v4 and shadcn-svelte:')[1];
  const css = section?.match(/```css\n([\s\S]*?)\n```/)?.[1];
  const darkVariant = section?.match(/`(@custom-variant dark [^`]+)`/)?.[1];
  assert(css, 'The README must provide the consumer CSS imports');
  assert(darkVariant, 'The README must define the data-theme dark variant');
  const fixture = await mkdtemp(join(tmpdir(), 'unset-brand-consumer-'));
  try {
    // Resolve the package through its real exports, as a separate consumer would.
    await mkdir(join(fixture, 'node_modules/@unset-sh'), { recursive: true });
    await symlink(root, join(fixture, 'node_modules/@unset-sh/brand'), 'dir');
    for (const dependency of ['tailwindcss', 'tw-animate-css']) {
      await symlink(join(root, 'node_modules', dependency), join(fixture, 'node_modules', dependency), 'dir');
    }
    await writeFile(join(fixture, 'style.css'), `${css}\n${darkVariant}\n`);
    await writeFile(join(fixture, 'index.html'), `<!doctype html>
      <html lang="en" class="style-vega" data-recipes="true" data-theme="dark">
        <head><link rel="stylesheet" href="./style.css"><title>Brand consumer</title></head>
        <body><button class="cn-button cn-button-size-default cn-button-variant-default font-sans">Save changes</button>
        <a data-role="text-link" href="#details">Read details</a></body>
      </html>`);
    const result = await build({
      root: fixture, configFile: false, logLevel: 'error', plugins: [tailwindcss()],
      build: { write: false, minify: false, cssMinify: false, assetsInlineLimit: 0 },
    });
    const outputs = (Array.isArray(result) ? result : [result]).flatMap(bundle => bundle.output);
    const fonts = outputs.filter(output => output.type === 'asset' && output.fileName.endsWith('.woff2'));
    assert.equal(fonts.length, 2, 'Both package font URLs must resolve and emit');
    const styles = outputs.filter(output => output.type === 'asset' && output.fileName.endsWith('.css'));
    assert.equal(styles.length, 1);
    const compiled = String(styles[0].source);
    assert(!/@(?:apply|theme|custom-variant)\b/.test(compiled), 'No uncompiled Tailwind directives may reach the browser');
    assert.match(compiled, /\.cn-button-variant-default/);
    assert.match(compiled, /data-theme=["']?dark/);
    for (const font of fonts) assert(compiled.includes(font.fileName), `Missing emitted font URL: ${font.fileName}`);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
