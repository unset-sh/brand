// The design tokens are internally sound: every colour has a value in every theme, the pairs the brand
// rules promise are readable, and the fonts and the mark's geometry agree with the files beside them.
import assert from "node:assert/strict";
import { test } from "node:test";
import { read, readJson } from "./repo.mjs";

const tokens = readJson("tokens/tokens.json");
const source = readJson("source.json");
const themes = tokens.color.themes.map((theme) => theme.id);
const colours = new Map(tokens.color.tokens.map((token) => [token.name, token.value]));

const HEX = /^#[0-9a-f]{6}$/;
const RGBA = /^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0|1|0\.\d+)\)$/;
const ALIAS = /^\{([a-z0-9-]+)\}$/;

/** Follows `{name}` aliases to the colour a token has in one theme. */
function resolve(name, theme, seen = []) {
  assert.ok(colours.has(name), `unknown colour token ${name}`);
  assert.ok(!seen.includes(name), `alias loop through ${name}`);
  const value = colours.get(name);
  const inTheme = typeof value === "string" ? value : value[theme];
  const alias = ALIAS.exec(inTheme);
  return alias ? resolve(alias[1], theme, [...seen, name]) : inTheme;
}

/** WCAG 2.2 relative luminance and contrast ratio: https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio */
function luminance(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((at) => Number.parseInt(hex.slice(at, at + 2), 16) / 255)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

test("there is a Dark and a Light theme", () => {
  assert.deepEqual(themes, ["dark", "light"]);
});

test("every colour token has a value in every theme", () => {
  for (const [name, value] of colours) {
    if (typeof value !== "string") {
      assert.deepEqual(Object.keys(value).sort(), themes.toSorted(), `${name}: themes`);
    }
    for (const theme of themes) {
      const resolved = resolve(name, theme);
      assert.ok(HEX.test(resolved) || RGBA.test(resolved), `${name} in ${theme}: ${resolved}`);
    }
  }
});

// guidelines/brand.md: text is `ink` or `ink-muted` on `ground`, `surface-raised` or `surface-card`; accents
// read at 4.5:1 or better; text on a fill is its `on-` token. 4.5:1 is WCAG 2.2 AA for body text (1.4.3).
const TEXT_PAIRS = [
  ...["ink", "ink-muted", "plum", "cyan", "emerald"].flatMap((text) =>
    ["ground", "surface-raised", "surface-card"].map((surface) => [text, surface]),
  ),
  ["on-ink", "ink"],
  ["on-plum", "plum"],
  ["on-cyan", "cyan"],
  ["on-emerald", "emerald"],
];

test("text colours read at 4.5:1 or better on the surfaces they are allowed on", () => {
  for (const theme of themes) {
    for (const [text, surface] of TEXT_PAIRS) {
      const ratio = contrast(resolve(text, theme), resolve(surface, theme));
      assert.ok(ratio >= 4.5, `${text} on ${surface} in ${theme} is ${ratio.toFixed(2)}:1`);
    }
  }
});

// `line-strong` is the border that carries meaning (inputs, selected state). 3:1 is WCAG 2.2 AA for
// user-interface components (1.4.11).
test("meaningful borders stand out at 3:1 or better", () => {
  for (const theme of themes) {
    for (const surface of ["ground", "surface-raised", "surface-card"]) {
      const ratio = contrast(resolve("line-strong", theme), resolve(surface, theme));
      assert.ok(ratio >= 3, `line-strong on ${surface} in ${theme} is ${ratio.toFixed(2)}:1`);
    }
  }
});

test("every font the tokens name is a pinned file in this repository", () => {
  const pinned = new Set(source.files.map((entry) => entry.path));
  assert.ok(tokens.type.fonts.length > 0);
  for (const font of tokens.type.fonts) {
    assert.ok(pinned.has(font.file), `${font.family}: ${font.file} is not pinned in source.json`);
  }
});

test("every type style uses a family the tokens define", () => {
  for (const group of tokens.type.groups) {
    assert.ok(group.family in tokens.type.families, `${group.name}: unknown family ${group.family}`);
  }
});

test("the mark files have the geometry the tokens record", () => {
  const mark = Object.fromEntries(tokens.mark.tokens.map((token) => [token.name, Number(token.value)]));
  const unit = mark["mark-ring-diameter"];
  const width = 3 * unit + 2 * mark["mark-gap"];
  for (const file of ["logo/unset-mark-platinum.svg", "logo/unset-mark-onyx.svg"]) {
    assert.ok(read(file).toString("utf8").includes(`viewBox="0 0 ${width} ${unit}"`), file);
  }
  assert.ok(read("icons/unset-favicon.svg").toString("utf8").includes(`viewBox="0 0 ${unit} ${unit}"`));
});
