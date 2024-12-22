import { CloseOutlined } from '@ant-design/icons';
import { Button, type ButtonProps } from 'antd';
import React from 'react';

const RemoveFormItemButton: React.FC<ButtonProps> = props => {
  return <Button size="small" type="text" icon={<CloseOutlined />} {...props} />;
};

export { RemoveFormItemButton };
