// The mark and icon files are plain, self-contained drawings. An SVG is read by browsers and by renderers,
// so it may hold only the shapes and attributes the mark needs: no script, style, link, image or text.
import assert from "node:assert/strict";
import { test } from "node:test";
import { filesIn, read } from "./repo.mjs";

const ELEMENTS = new Set(["svg", "g", "path", "rect"]);
const ATTRIBUTES = new Set(["xmlns", "viewBox", "fill", "fill-rule", "d", "transform", "width", "height"]);
// Platinum and Onyx, and the pure white and black of the print-only files (guidelines/logo.md).
const FILLS = new Set(["#f0edee", "#0a090c", "#ffffff", "#000000"]);

const svgs = [...filesIn("logo"), ...filesIn("icons")].filter((path) => path.endsWith(".svg"));
const pngs = [...filesIn("logo"), ...filesIn("icons")].filter((path) => path.endsWith(".png"));

test("there are SVG and PNG files to check", () => {
  assert.ok(svgs.length > 0);
  assert.ok(pngs.length > 0);
});

for (const path of svgs) {
  test(`${path} holds only the mark's shapes`, () => {
    const text = read(path).toString("utf8");
    assert.ok(text.startsWith('<svg xmlns="http://www.w3.org/2000/svg" '), "starts with the svg element");

    const outsideTags = text.replaceAll(/<\/?[A-Za-z][^<>]*>/g, "");
    assert.equal(outsideTags, "", "nothing but elements: no text, comment, entity or processing instruction");

    for (const [, closing, name, rest] of text.matchAll(/<(\/?)([A-Za-z][\w:-]*)([^<>]*)>/g)) {
      assert.ok(ELEMENTS.has(name), `element <${name}>`);
      if (closing) {
        assert.equal(rest, "", `closing tag </${name}>`);
        continue;
      }
      const leftover = rest.replaceAll(/\s+([\w:-]+)="([^"]*)"/g, (_, attribute, value) => {
        assert.ok(ATTRIBUTES.has(attribute), `attribute ${attribute} on <${name}>`);
        if (attribute === "xmlns") assert.equal(value, "http://www.w3.org/2000/svg");
        if (attribute === "fill") assert.ok(FILLS.has(value), `fill ${value}`);
        return "";
      });
      assert.equal(leftover, "", `<${name}> has only quoted attributes`);
    }
  });
}

// Width and height are the two big-endian integers after the IHDR tag: https://www.w3.org/TR/png-3/#11IHDR
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const PNG_SIZES = {
  "icons/unset-favicon-16.png": 16,
  "icons/unset-favicon-32.png": 32,
  "icons/unset-apple-touch-icon.png": 180,
  "icons/unset-icon-192.png": 192,
  "icons/unset-icon-512.png": 512,
  "logo/unset-mark-source.png": 1080,
  "logo/unset-link-card.png": [1200, 630],
};

test("every PNG has a size on record", () => {
  assert.deepEqual(pngs.toSorted(), Object.keys(PNG_SIZES).sort());
});

for (const [path, size] of Object.entries(PNG_SIZES)) {
  const [width, height] = Array.isArray(size) ? size : [size, size];
  test(`${path} is a ${width} by ${height} PNG`, () => {
    const bytes = read(path);
    assert.ok(bytes.subarray(0, 8).equals(PNG_SIGNATURE), "PNG signature");
    assert.equal(bytes.subarray(12, 16).toString("latin1"), "IHDR");
    assert.equal(bytes.readUInt32BE(16), width, "width");
    assert.equal(bytes.readUInt32BE(20), height, "height");
  });
}
