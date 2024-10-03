import baseConfig from '../../.lintstagedrc.mjs';

export default {
  ...baseConfig,
  '*.{ts,tsx}': 'eslint . --ext .ts,.tsx --fix',
};
