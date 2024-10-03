import baseConfig from '../../.lintstagedrc.js';

export default {
  ...baseConfig,
  '*.{ts,tsx}': 'eslint . --ext .ts,.tsx --fix',
};
