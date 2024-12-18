import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@/configuration': '/src/configuration',
      '@/features': '/src/features',
      '@/lib': '/src/lib',
      '@/services': '/src/services',
      '@/exceptions': '/src/exceptions',
      '@/infrastructure': '/src/infrastructure',
      '@/utils': '/src/utils',
    },
  },
});
