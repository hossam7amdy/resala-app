export default {
  '*': ['yarn format:fix'],
  'packages/**/*.{ts,tsx}': ['yarn lint:fix'],
};
