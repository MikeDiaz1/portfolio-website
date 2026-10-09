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
    {
      name: 'legacy-portfolio-redirect',
      configureServer(server) {
        // Vite dev does not resolve static directory indexes like Pages does.
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url ?? '/', 'http://localhost');
          if (url.pathname !== '/portfolio-website' && url.pathname !== '/portfolio-website/') return next();
          response.writeHead(307, { Location: '/' + url.search });
          response.end();
        });
      }
    },
    sveltekit({
      adapter: adapter({ strict: true }),
      paths: { base: basePath as '' | `/${string}`, relative: false }
    })
  ]
});
