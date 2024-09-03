/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'primary-100': '#e7eff1',
        'primary-200': '#b9ced4',
        'primary-300': '#8cafb8',
        'primary-400': '#5e909d',
        'primary-500': '#2c7282',
        'primary-600': '#026375',
        'primary-700': '#014755',
        'primary-800': '#002e37',
        'primary-900': '#00161c',
      },
    },
    screens: {
      xs: { max: '576px' },
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px',
    },
    fontFamily: {
      dmSans: ['var(--my-font-dm-sans)'],
      hubotSans: ['var(--my-font-hubot-sans)'],
    },
  },
  plugins: [],
};
