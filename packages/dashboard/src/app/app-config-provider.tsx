import { ConfigProvider as AntConfigProvider, App } from 'antd';
import React from 'react';

import theme from './theme.config';

const AppConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AntConfigProvider theme={theme}>
      <App>{children}</App>
    </AntConfigProvider>
  );
};

export default AppConfigProvider;
