import { defineConfig, devices } from '@playwright/test';

const base = process.env.BASE_PATH ?? '';
const port = Number(process.env.PORT ?? 4173);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:' + port + base + '/',
    trace: 'retain-on-failure'
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1536, height: 1024 } } }],
  webServer: {
    command: 'node scripts/serve-static.mjs',
    url: 'http://127.0.0.1:' + port + base + '/',
    reuseExistingServer: !process.env.CI
  }
});
