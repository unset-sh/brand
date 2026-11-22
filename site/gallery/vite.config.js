import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const local = (path) => fileURLToPath(new URL(path, import.meta.url));
const basePath = process.env.BRAND_BASE_PATH || '/';
if (!basePath.startsWith('/') || !basePath.endsWith('/') || basePath.includes('..')) {
  throw new Error('BRAND_BASE_PATH must be a root-relative path ending in /');
}

export default defineConfig({
  root: local('./'),
  base: `${basePath}components/`,
  plugins: [svelte(), tailwindcss()],
  resolve: { alias: {
    '$lib': local('./src/lib'),
    '$primitives': local('./src/primitives'),
    '$brand-dist': local('../../dist'),
    '$brand-icons': local('../../icons/tabler'),
    '$brand-logo': local('../../logo'),
    '@shadcn-svelte/primitives/questionnaire': local('./src/primitives/questionnaire/index.ts'),
    '@shadcn-svelte/primitives/message-scroller': local('./src/primitives/message-scroller/index.ts'),
    '@shadcn-svelte/primitives/svelte-virtual': local('./src/primitives/svelte-virtual/index.ts'),
  } },
  cacheDir: local('./.vite-cache'),
  build: { outDir: local('../public/components'), emptyOutDir: true, chunkSizeWarningLimit: 800 },
});
