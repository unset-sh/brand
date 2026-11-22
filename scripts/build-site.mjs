import { rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { build, root } from './build.mjs';
import { buildGuide, guideBaseURL } from './build-guide.mjs';

const baseURL = guideBaseURL();
const siteEnv = { ...process.env, BRAND_BASE_URL: baseURL, BRAND_BASE_PATH: new URL(baseURL).pathname };
await build();
await rm(resolve(root, 'site/public'), { recursive: true, force: true });
await buildGuide({ env: siteEnv });
for (const args of [
  ['site/gallery/scripts/build-syntax.mjs'],
  ['node_modules/vite/bin/vite.js', 'build', '--config', 'site/gallery/vite.config.js']
]) {
  const result = spawnSync(process.execPath, args, { cwd: root, env: siteEnv, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Website build failed: ${args.join(' ')}`);
}
