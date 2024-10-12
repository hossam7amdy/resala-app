import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'resala/server - [ Unit Tests ]',
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      configuration: '/src/configuration',
      features: '/src/features',
      lib: '/src/lib',
      middlewares: '/src/middlewares',
      services: '/src/services',
      datastore: '/src/datastore',
      utils: '/src/utils',
    },
  },
});
