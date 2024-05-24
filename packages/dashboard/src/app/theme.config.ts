import type { ThemeConfig } from 'antd';

export const primaryColor = 'rgb(2, 99, 117)';
export const primaryColorLight = 'rgba(2, 99, 117, 0.1)';
export const shadowColor = 'rgba(0, 0, 0, 0.1)';
export const boxShadow = `0 0 10px ${shadowColor}`;

const theme: ThemeConfig = {
  token: {
    colorPrimary: primaryColor,
    colorLink: primaryColor,
  },
  components: {
    Button: {
      primaryShadow: 'none',
    },
    Layout: {
      siderBg: 'transparent',
    },
  },
};

export default theme;
