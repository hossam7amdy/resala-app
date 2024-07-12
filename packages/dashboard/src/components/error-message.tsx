import Text from 'antd/es/typography/Text';
import React from 'react';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div style={{ margin: '5px 0' }}>
      <Text type="danger">{message}</Text>
    </div>
  );
};

export default ErrorMessage;
