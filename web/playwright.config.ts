import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:4000',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1200, height: 800 },
  },
  webServer: {
    command: 'npm run start -- -p 4000',
    port: 4000,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
