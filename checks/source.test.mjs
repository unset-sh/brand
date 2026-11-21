// The drift check. Everything this repository ships is a copy of something decided elsewhere (the design
// sheet, or a font project's licence). source.json records where each copy came from and its sha256, so a
// file edited by hand, added without a pin, or lost fails here.
import assert from "node:assert/strict";
import { test } from "node:test";
import { PINNED_FOLDERS, filesIn, readJson, sha256 } from "./repo.mjs";

const source = readJson("source.json");
const ORIGINS = new Set(["sheet", "font-project"]);

test("source.json names the design sheet version the copies were taken from", () => {
  assert.match(source.sheetUrl, /^https:\/\/claude\.ai\/artifact\/[A-Za-z0-9]+$/);
  assert.match(source.sheetVersion, /^\d+-[0-9a-f]{4}$/);
  assert.match(source.copiedAt, /^\d{4}-\d{2}-\d{2}$/);
});

test("every entry says where the file came from and carries a sha256", () => {
  for (const entry of source.files) {
    assert.deepEqual(Object.keys(entry).sort(), ["from", "origin", "path", "sha256"], entry.path);
    assert.ok(ORIGINS.has(entry.origin), `${entry.path}: unknown origin ${entry.origin}`);
    assert.ok(entry.from.length > 0, `${entry.path}: empty "from"`);
    assert.match(entry.sha256, /^[0-9a-f]{64}$/, entry.path);
  }
});

test("no file is listed twice", () => {
  const paths = source.files.map((entry) => entry.path);
  assert.deepEqual(paths.toSorted(), [...new Set(paths)].sort());
});

test("every listed file is present and matches its sha256", () => {
  for (const entry of source.files) {
    assert.equal(sha256(entry.path), entry.sha256, `${entry.path} differs from its pin in source.json`);
  }
});

test("every file in a pinned folder is listed", () => {
  const listed = new Set(source.files.map((entry) => entry.path));
  const present = PINNED_FOLDERS.flatMap(filesIn);
  const unlisted = present.filter((path) => !listed.has(path));
  assert.deepEqual(unlisted, [], "files with no pin in source.json");
});

test("every listed file sits in a pinned folder", () => {
  for (const entry of source.files) {
    assert.ok(PINNED_FOLDERS.includes(entry.path.split("/")[0]), `${entry.path} is outside the pinned folders`);
  }
});
