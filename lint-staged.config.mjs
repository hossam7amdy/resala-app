export default {
  '*': ['yarn format'],
  'packages/**/*.{ts,tsx,spec.ts,test.ts}': ['yarn lint'],
  'packages/**/*.{test.ts, test.tsx}': ['yarn test'],
};
