import { defineConfig } from 'tsup';

export default defineConfig(() => {
  return {
    entry: {
      index: './index.ts',
    },
    format: ['esm', 'cjs'],
    bundle: true,
    splitting: false,
    cjsInterop: true,
    skipNodeModulesBundle: true,
    external: ['zod'],
  };
});
