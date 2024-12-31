export default {
  '*': ['yarn format'],
  'packages/**/*.{ts,tsx}': ['yarn lint'],
  'packages/**/*.{test.ts, test.tsx}': ['yarn test'],
};
