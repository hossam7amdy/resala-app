import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    name: 'resala/server - [ Unit Test ]',
    include: ['src/**/*.test.ts', '!src/tests'],
  },
});
