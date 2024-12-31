import { defineConfig } from 'tsup';

export default defineConfig(() => {
  return {
    entry: {
      index: './src/app.ts',
      features: './src/features/index.ts',
    },
    format: ['esm', 'cjs'],
    bundle: true,
    splitting: false,
    cjsInterop: true,
    skipNodeModulesBundle: true,
  };
});
