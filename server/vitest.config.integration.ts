import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'resala/server - [ Integration Test ]',
    environment: 'node',
    include: ['src/tests/**/*.test.ts'],
    setupFiles: ['src/tests/testserver.ts'],
  },
  resolve: {
    alias: {
      config: '/src/config',
      controller: '/src/controller',
      lib: '/src/lib',
      middleware: '/src/middleware',
      service: '/src/service',
      utils: '/src/utils',
    },
  },
});
