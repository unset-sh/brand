import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

const output = async (path, data) => {
  const url = new URL(path, import.meta.url);
  const content = JSON.stringify(data, null, 2) + '\n';
  if (process.argv.includes('--check')) assert.equal(await readFile(url, 'utf8'), content, `Generated drift: ${path}`);
  else await writeFile(url, content);
};
const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const contract = await readJson('../../../dist/contract.json');
const themes = Object.fromEntries(await Promise.all(['light', 'dark'].map(async mode =>
  [mode, await readJson(`../../../dist/syntax/moss-clay-${mode}.json`)]
)));
const index = new Map(contract.tokens.map(token => [token.id, token]));
function resolveToken(id, mode, trail = []) {
  assert(!trail.includes(id), `Cyclic reference: ${id}`);
  const token = index.get(id);
  assert(token, `Unknown token: ${id}`);
  return token.ref ? resolveToken(token.ref, mode, [...trail, id]) : token.values?.[mode] ?? token.value;
}
const roles = contract.tokens.filter(token => token.id.startsWith('code.') && token.type === 'color' && token.id !== 'code.background').map(token => token.id.slice(5));
const palette = Object.fromEntries(['light', 'dark'].map(mode => [mode,
  Object.fromEntries(roles.map(role => [role, resolveToken(`code.${role}`, mode).toLowerCase()]))
]));
const fixtures = [
  { id: 'typescript', label: 'TypeScript', filename: 'profile.ts', code: `import type { Profile } from './types';

// A small space, made your own.
const profile: Profile = {
  name: 'Mika Rowan',
  visibility: 'public',
  featured: true,
  postLimit: 12,
};

export function greet(name: string) {
  return \`Welcome, \${name}.\`;
}

export default profile;` },
  { id: 'svelte', label: 'Svelte', filename: 'Profile.svelte', code: `<script lang="ts">
  import { Button } from '$lib/ui/button';
  let follows = $state(12);
</script>

<!-- A profile that feels like you. -->
<section aria-label="Profile">
  <h2>Mika Rowan</h2>
  <p>{follows} people following</p>
  <Button onclick={() => follows += 1}>
    Follow profile
  </Button>
</section>` },
  { id: 'css', label: 'CSS', filename: 'profile.css', code: `/* Shared foundations, personal expression. */
.profile {
  display: grid;
  gap: 1.5rem;
  color: var(--foreground);
  background: var(--background);
  font-family: 'Space Grotesk', sans-serif;
}

.profile:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}` },
  { id: 'json', label: 'JSON', filename: 'profile.json', code: `{
  "name": "Mika Rowan",
  "visibility": "public",
  "featured": true,
  "postLimit": 12,
  "sections": [
    "About",
    "Recent posts",
    "Elsewhere"
  ],
  "customDomain": null
}` },
  { id: 'shellscript', label: 'Shell', filename: 'preview.sh', code: `#!/usr/bin/env bash
set -eu

# Build a local preview.
for name in docs app renderer; do
  printf 'Preparing %s\\n' "$name"
done

if [ -d "dist" ]; then
  printf 'Preview is ready.\\n'
else
  printf 'Run the build first.\\n'
fi` },
];
const highlighter = await createHighlighterCore({
  themes: [themes.light, themes.dark],
  langs: [import('shiki/langs/typescript.mjs'), import('shiki/langs/svelte.mjs'), import('shiki/langs/css.mjs'), import('shiki/langs/json.mjs'), import('shiki/langs/shellscript.mjs')],
  engine: createJavaScriptRegexEngine({ forgiving: true }),
});
const checks = [];
try {
  const samples = Object.fromEntries(fixtures.map(fixture => {
    const { tokens } = highlighter.codeToTokens(fixture.code, {
      lang: fixture.id, themes: { light: themes.light.name, dark: themes.dark.name }, defaultColor: false,
    });
    assert.equal(tokens.map(line => line.map(token => token.content).join('')).join('\n'), fixture.code);
    const lines = tokens.map(line => line.map(token => {
      const role = roles.find(role => ['light','dark'].every(mode =>
        palette[mode][role] === token.htmlStyle[`--shiki-${mode}`].toLowerCase()
      ));
      assert(role, `Unmapped syntax colour in ${fixture.id}`);
      return { content: token.content, style: `color:var(--syntax-${role})` };
    }));
    for (const mode of ['light','dark']) checks.push({ language: fixture.id, mode, roundtrip: true });
    return [fixture.id, lines];
  }));
  await output('../src/syntax-samples.json', { fixtures, samples });
  await output('../syntax-verification.json', { shikiVersion: '3.20.0', theme: contract.syntax.id, checks });
  console.log(`${process.argv.includes('--check') ? 'Verified' : 'Generated'} ${checks.length} verified Moss & clay syntax examples.`);
} finally {
  highlighter.dispose();
}
