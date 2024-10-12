import dotenv from 'dotenv';
import { defineConfig } from 'vitest/config';

dotenv.config({ path: '.env.test' });

export default defineConfig({
  test: {
    name: 'resala/server - [ Test ]',
    environment: 'node',
    include: ['src/**/*.test.ts'],
    setupFiles: [],
    globalSetup: 'src/tests/setup/globalSetup.ts',
  },
  resolve: {
    alias: {
      configuration: '/src/configuration',
      features: '/src/features',
      lib: '/src/lib',
      middlewares: '/src/middlewares',
      services: '/src/services',
      datastore: '/src/datastore',
      tests: '/src/tests',
      utils: '/src/utils',
    },
  },
});
