import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// GitHub Actions supplies the actual Pages base path, including custom domains.
const basePath = process.env.BASE_PATH ?? '';

if (basePath !== '' && (!basePath.startsWith('/') || basePath.endsWith('/'))) {
  throw new Error('BASE_PATH must be empty or start with / and have no trailing slash.');
}

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter({ strict: true }),
      paths: { base: basePath as '' | `/${string}`, relative: false }
    })
  ]
});
