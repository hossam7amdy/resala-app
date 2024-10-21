import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'resala/server - [ Integration Test ]',
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    globalSetup: 'tests/setup/global-setup.ts',
    setupFiles: ['tests/setup/reset-db.ts'],
  },
});
