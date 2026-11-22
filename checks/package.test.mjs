// The package is data and nothing else: no dependency, no code that runs on install, and exactly the
// pinned files plus the documents that explain them.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { readJson, root } from "./repo.mjs";

const manifest = readJson("package.json");
const source = readJson("source.json");

test("the package is @unset-sh/brand, published to GitHub Packages from this repository", () => {
  assert.equal(manifest.name, "@unset-sh/brand");
  assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
  assert.deepEqual(manifest.publishConfig, { registry: "https://npm.pkg.github.com" });
  assert.equal(manifest.repository.url, "git+https://github.com/unset-sh/brand.git");
});

test("it depends on nothing", () => {
  for (const field of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies", "bundleDependencies"]) {
    assert.equal(manifest[field], undefined, field);
  }
});

test("nothing runs when it is installed or packed", () => {
  assert.deepEqual(Object.keys(manifest.scripts), ["check"]);
  assert.equal(manifest.bin, undefined);
});

test("every export points at a file or folder that exists", () => {
  for (const [name, target] of Object.entries(manifest.exports)) {
    const path = target.replace(/\*$/, "");
    assert.ok(existsSync(new URL(path, root)), `${name} -> ${target}`);
  }
});

test("the packed files are the pinned files and the documents that explain them", () => {
  const output = execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
    cwd: fileURLToPath(root),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  const packed = JSON.parse(output)[0].files.map((file) => file.path).sort();
  const expected = [
    ...source.files.map((entry) => entry.path),
    "LICENSE",
    "LICENSE-ASSETS.md",
    "README.md",
    "package.json",
    "source.json",
  ].sort();
  assert.deepEqual(packed, expected);
});
