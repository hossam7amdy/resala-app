import dotenv from 'dotenv';
import { defineConfig } from 'vitest/config';

dotenv.config();

export default defineConfig({
  test: {
    environment: 'node',
    name: 'resala/server - [ Unit Test ]',
    include: ['src/**/*.test.ts', '!src/tests'],
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
