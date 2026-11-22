import { readFile } from 'node:fs/promises';
import { createResolver } from './lib/contract.mjs';

const contract = JSON.parse(await readFile(new URL('../dist/contract.json', import.meta.url), 'utf8'));
const [prefix = '', theme = 'dark'] = process.argv.slice(2);
const resolve = createResolver(contract);
const matches = contract.tokens.filter(token => token.id === prefix || token.id.startsWith(prefix + '.') || !prefix);
if (!matches.length) throw new Error(`No tokens match: ${prefix}`);
console.log(JSON.stringify(matches.map(token => ({ ...token, resolved: resolve(token.id, theme) })), null, 2));
