import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

export function createResolver(contract, schema) {
  if (schema) {
    const ajv = new Ajv2020({ allErrors: true, strict: false });
    addFormats(ajv);
    const validate = ajv.compile(schema);
    if (!validate(contract)) throw new Error(`Contract schema: ${ajv.errorsText(validate.errors)}`);
  }
  const index = new Map(contract.tokens.map(token => [token.id, token]));
  if (index.size !== contract.tokens.length) throw new Error('Duplicate token IDs');
  const sources = new Set(contract.sources.map(source => source.id));
  if (sources.size !== contract.sources.length) throw new Error('Duplicate source IDs');
  const variables = new Set();
  const byVariable = new Map();
  for (const token of contract.tokens) {
    if (['value', 'values', 'ref'].filter(key => Object.hasOwn(token, key)).length !== 1) {
      throw new Error(`Ambiguous token: ${token.id}`);
    }
    for (const source of token.sourceIds) if (!sources.has(source)) throw new Error(`Unknown source: ${source}`);
    if (token.cssVariable) {
      if (!/^--[a-z][a-z0-9-]*$/.test(token.cssVariable) || variables.has(token.cssVariable)) {
        throw new Error(`Invalid or duplicate CSS variable: ${token.cssVariable}`);
      }
      variables.add(token.cssVariable);
      byVariable.set(token.cssVariable, token.id);
    }
  }
  function resolve(id, theme = 'dark', preserveAliases = false, trail = []) {
    if (!['light', 'dark'].includes(theme)) throw new Error(`Unknown theme: ${theme}`);
    if (trail.includes(id)) throw new Error(`Circular token reference: ${[...trail, id].join(' → ')}`);
    const token = index.get(id);
    if (!token) throw new Error(`Unknown token: ${id}`);
    if (token.ref) {
      const target = index.get(token.ref);
      if (!target) throw new Error(`Unknown reference: ${token.ref}`);
      if (target.type !== token.type) throw new Error(`Reference type mismatch: ${id}`);
      if (token.kind === 'primitive' || (token.kind === 'semantic' && target.kind === 'component')) {
        throw new Error(`Invalid layer dependency: ${id}`);
      }
      const resolved = resolve(token.ref, theme, preserveAliases, [...trail, id]);
      return preserveAliases && target.cssVariable ? `var(${target.cssVariable})` : resolved;
    }
    const value = token.values ? token.values[theme] : token.value;
    if (!['string', 'number'].includes(typeof value) || (token.type === 'number' && !Number.isFinite(Number(value))) || /[;{}<>]/.test(String(value))) {
      throw new Error(`Invalid CSS value: ${id}/${theme}`);
    }
    if (token.type === 'color' && !/^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(String(value))) {
      // Explicit CSS expressions (e.g. transparent overlays) are allowed but
      // audited contrast pairs below must resolve to opaque sRGB hex colours.
      if (!/^(transparent|rgba?\([\d.,%\s/]+\)|color-mix\([a-z\d#.,%\s()-]+\))$/i.test(String(value))) {
        throw new Error(`Invalid colour: ${id}`);
      }
    }
    let resolved = String(value).replace(/var\((--[a-z0-9-]+)\)/g, (_, variable) => {
      const target = byVariable.get(variable);
      if (!target) throw new Error(`Unknown CSS reference: ${variable}`);
      return String(resolve(target, theme, false, [...trail, id]));
    });
    if (/var\(/.test(resolved)) throw new Error(`Unsupported CSS reference: ${id}`);
    if (resolved.startsWith('calc(')) {
      // The contract's dimension expressions use a length scaled by a scalar.
      // Resolve these for non-browser renderers without executing CSS or JS.
      const expression = resolved.match(/^calc\(([\d.]+)([a-z%]+)\s*([*/])\s*([\d.]+)\)$/);
      if (!expression) throw new Error(`Unsupported dimension expression: ${id}`);
      const [, length, unit, operator, scalar] = expression;
      const result = operator === '*' ? Number(length) * Number(scalar) : Number(length) / Number(scalar);
      if (!Number.isFinite(result)) throw new Error(`Invalid dimension expression: ${id}`);
      resolved = `${Number(result.toFixed(10))}${unit}`;
    }
    return token.type === 'number' ? Number(value) : preserveAliases ? String(value) : resolved;
  }
  for (const token of contract.tokens) {
    for (const theme of ['light', 'dark']) resolve(token.id, theme);
  }
  return resolve;
}

export function luminance(hex) {
  if (!/^#[\da-f]{3}([\da-f]{3})?$/i.test(hex)) throw new Error(`Contrast requires opaque sRGB hex: ${hex}`);
  const rgb = hex.length === 4 ? [...hex.slice(1)].map(c => c + c).join('') : hex.slice(1);
  const [r, g, b] = [0, 2, 4].map(i => parseInt(rgb.slice(i, i + 2), 16) / 255)
    .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return r * .2126 + g * .7152 + b * .0722;
}

export function contrastRatio(foreground, background) {
  const a = luminance(foreground), b = luminance(background);
  return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
}

export function checkContrast(contract, resolve) {
  const pairs = [
    ...['color.ink', 'color.ink-muted', 'color.link', 'color.link-visited'].flatMap(fg =>
      ['color.ground', 'color.surface-card', 'color.surface-raised'].map(bg => [fg, bg])),
    ['component.button.primary.foreground', 'component.button.primary.background'],
    ...['success', 'warning', 'error', 'info'].map(role =>
      [`component.alert.${role}.foreground`, `component.alert.${role}.background`]),
    ...contract.tokens.filter(t => t.id.startsWith('code.') && t.id !== 'code.background' && t.type === 'color')
      .flatMap(t => [[t.id, 'component.code.background'], [t.id, 'code.background']])
  ];
  return ['light', 'dark'].flatMap(theme => pairs.map(([foreground, background]) => {
    const ratio = contrastRatio(resolve(foreground, theme), resolve(background, theme));
    if (ratio < 4.5) throw new Error(`${theme}: ${foreground} on ${background}: ${ratio.toFixed(2)}:1, requires 4.5:1`);
    return { theme, foreground, background, ratio: Number(ratio.toFixed(3)), minimum: 4.5 };
  }));
}
