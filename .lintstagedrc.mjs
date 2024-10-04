export default {
  'packages/**/*.{ts,tsx,json}': ['yarn format:fix'],
  'packages/**/*.{ts,tsx}': ['yarn lint:fix'],
};
