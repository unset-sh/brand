import assert from 'node:assert/strict';
import test from 'node:test';
import { readJson } from './repo.mjs';
import { createResolver, contrastRatio, checkContrast } from '../scripts/lib/contract.mjs';

const contract = readJson('src/contract.json');
const schema = readJson('src/contract.schema.json');
const change = fn => { const copy = structuredClone(contract); fn(copy); return copy; };

test('the schema validates the complete authored contract', () => {
  const resolve = createResolver(contract, schema);
  assert.equal(resolve('component.button.primary.background', 'light'), '#171717');
  assert.equal(resolve('component.button.primary.background', 'dark', true), 'var(--primary)');
});

test('missing references, cycles and duplicate identifiers fail closed', () => {
  assert.throws(() => createResolver(change(c => c.tokens.find(t => t.ref).ref = 'missing')), /Unknown reference/);
  assert.throws(() => createResolver(change(c => c.tokens.find(t => t.ref).ref = c.tokens.find(t => t.ref).id)), /Circular/);
  assert.throws(() => createResolver(change(c => c.tokens.push(c.tokens[0]))), /Duplicate token/);
  assert.throws(() => createResolver(change(c => {
    const vars = c.tokens.filter(t => t.cssVariable); vars[1].cssVariable = vars[0].cssVariable;
  })), /duplicate CSS variable/);
});

test('schema rejects ambiguous values and incomplete themes', () => {
  assert.throws(() => createResolver(change(c => c.tokens.find(t => t.ref).value = '1'), schema), /schema/);
  assert.throws(() => createResolver(change(c => delete c.tokens.find(t => t.values).values.light), schema), /schema/);
});

test('unsafe values, unknown provenance and backwards layer dependencies fail', () => {
  assert.throws(() => createResolver(change(c => c.tokens.find(t => t.values).values.dark = 'red;}body{display:none')), /Invalid CSS/);
  assert.throws(() => createResolver(change(c => c.tokens[0].sourceIds = ['missing'])), /Unknown source/);
  assert.throws(() => createResolver(change(c => c.tokens.find(t => t.kind === 'semantic' && t.ref).ref = 'component.button.primary.background')), /Invalid layer/);
});

test('contrast uses WCAG sRGB reference values and fails an unreadable pair', () => {
  assert.equal(contrastRatio('#000000', '#ffffff'), 21);
  assert.equal(contrastRatio('#aaa', '#aaaaaa'), 1);
  assert.throws(() => contrastRatio('oklch(1 0 0)', '#fff'), /opaque sRGB/);
  const broken = change(c => c.tokens.find(t => t.id === 'palette.ink').values.light = '#f5f5f5');
  assert.throws(() => checkContrast(broken, createResolver(broken)), /requires 4.5/);
  assert.equal(checkContrast(contract, createResolver(contract)).length, 66);
});

test('links, actions and syntax have independent roles in both themes', () => {
  const resolve = createResolver(contract);
  for (const theme of ['light', 'dark']) {
    assert.notEqual(resolve('color.link', theme), resolve('component.button.primary.background', theme));
    assert.notEqual(resolve('color.link', theme), resolve('color.link-visited', theme));
    assert.notEqual(resolve('code.keyword', theme), resolve('color.link-visited', theme));
  }
});

test('all colour roles reject invalid hex lengths, including unaudited chart colours', () => {
  const replace = color => change(c => c.tokens.find(t => t.id === 'palette.chart-1').values.dark = color);
  for (const invalid of ['#12345', '#12', '#1234567']) {
    assert.throws(() => createResolver(replace(invalid), schema), /Invalid colour/);
  }
  assert.equal(createResolver(replace('#1234'), schema)('palette.chart-1'), '#1234');
  assert.equal(createResolver(replace('#12345678'), schema)('palette.chart-1'), '#12345678');
});

test('renderer number tokens retain their numeric type', () => {
  const number = contract.tokens.find(t => t.type === 'number');
  assert.equal(typeof createResolver(contract)(number.id), 'number');
});

test('renderer dimensions resolve CSS aliases and scaling without a browser', () => {
  const resolve = createResolver(contract);
  assert.equal(resolve('radius.md'), resolve('radius.base'));
  const base = parseFloat(resolve('radius.base'));
  assert.equal(parseFloat(resolve('radius.sm')), base / 2);
  assert.equal(parseFloat(resolve('radius.4xl')), base * 3);
  assert.equal(resolve('radius.sm', 'dark', true), 'calc(var(--radius) / 2)');
  assert.throws(() => createResolver(change(c => c.tokens.find(t => t.id === 'radius.sm').value = 'var(--missing)')), /Unknown CSS reference/);
  assert.throws(() => createResolver(change(c => c.tokens.find(t => t.id === 'radius.sm').value = 'var(--radius-sm)')), /Circular/);
});
