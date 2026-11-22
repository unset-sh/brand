import { access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
export const hugoVersion = '0.168.0';

/** Match the Pages base path while also supporting a custom domain or local preview. */
export function guideBaseURL(env = process.env) {
  const path = env.BRAND_BASE_PATH || '/';
  if (!/^\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]*$/.test(path)) {
    throw new Error('BRAND_BASE_PATH must be an absolute path such as / or /brand/');
  }
  const basePath = path.endsWith('/') ? path : `${path}/`;
  const url = new URL(env.BRAND_BASE_URL || `https://unset-sh.github.io${basePath}`);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new Error('BRAND_BASE_URL must be a plain http(s) site URL');
  }
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  if (env.BRAND_BASE_PATH && url.pathname !== basePath) {
    throw new Error('BRAND_BASE_PATH and BRAND_BASE_URL must identify the same site path');
  }
  return url.href;
}

export async function buildGuide({ env = process.env, destination = resolve(root, 'site/public') } = {}) {
  await Promise.all(['dist/contract.json', 'dist/tokens.css', 'icons/tabler/icons.json'].map(path => access(resolve(root, path))));
  const binary = env.HUGO_BINARY || 'hugo';
  const version = spawnSync(binary, ['version'], { encoding: 'utf8', env });
  if (version.error) throw new Error(`Install Hugo ${hugoVersion} or set HUGO_BINARY to that executable`, { cause: version.error });
  if (version.status !== 0 || !new RegExp(`^hugo v${hugoVersion.replaceAll('.', '\\.')}[\\s-]`).test(version.stdout)) {
    throw new Error(`The brand guide requires Hugo ${hugoVersion}; received ${version.stdout.trim()}`);
  }
  const result = spawnSync(binary, [
    'build', '--source', resolve(root, 'site/guide'), '--destination', destination,
    '--baseURL', guideBaseURL(env), '--gc', '--minify', '--panicOnWarning', '--noBuildLock',
  ], { cwd: root, env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Hugo failed with exit code ${result.status}`);
  return destination;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await buildGuide();
}
