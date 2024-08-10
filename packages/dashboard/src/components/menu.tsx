import { Menu as AntMenu } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';

export const Menu: React.FC<MenuProps> = props => (
  <AntMenu
    theme="light"
    mode="inline"
    style={{ fontWeight: 600, background: 'transparent', width: '100%' }}
    {...props}
  />
);
