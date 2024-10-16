export default {
  '*': ['yarn format:fix'],
  'packages/**/*.{ts,tsx,spec.ts,test.ts}': ['yarn lint:fix'],
};
