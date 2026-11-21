// Shared by the checks: where the repository is, what it pins, and how to read it.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";

export const root = new URL("../", import.meta.url);

/** Folders that hold nothing but pinned copies. Every file in them must be listed in source.json. */
export const PINNED_FOLDERS = ["tokens", "fonts", "logo", "icons", "guidelines"];

export function read(path) {
  return readFileSync(new URL(path, root));
}

export function readJson(path) {
  return JSON.parse(read(path).toString("utf8"));
}

export function sha256(path) {
  return createHash("sha256").update(read(path)).digest("hex");
}

/** Repository-relative paths of every file under a folder, sorted. */
export function filesIn(folder) {
  return readdirSync(new URL(`${folder}/`, root), { recursive: true })
    .map((name) => `${folder}/${String(name).replaceAll("\\", "/")}`)
    .filter((path) => statSync(new URL(path, root)).isFile())
    .sort();
}
