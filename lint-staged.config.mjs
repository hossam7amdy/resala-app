export default {
  '*': ['yarn format'],
  'packages/**/*.{ts,tsx,spec.ts,test.ts}': ['yarn lint'],
};
