import { PlusOutlined } from '@ant-design/icons';
import { Button, type ButtonProps } from 'antd';
import React from 'react';

const AddFormItemButton: React.FC<ButtonProps> = props => {
  return <Button type="dashed" icon={<PlusOutlined />} {...props} />;
};

export { AddFormItemButton };
