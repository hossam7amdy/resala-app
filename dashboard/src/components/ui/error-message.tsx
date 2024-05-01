import Text from 'antd/es/typography/Text';
import React from 'react';

interface ErrorMessageProps {
  message: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div style={{ margin: '5px 0' }}>
      <Text type="danger">{message}</Text>
    </div>
  );
};

export default ErrorMessage;
