'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound: React.FC<{ message: string }> = ({
  message = 'Sorry, the page you visited does not exist.',
}) => {
  const router = useRouter();

  return (
    <Result
      status="404"
      title="404"
      subTitle={message}
      extra={
        <Button
          htmlType="submit"
          type="primary"
          onClick={() => router.back()}
          icon={<ArrowLeftOutlined />}
        >
          Back
        </Button>
      }
    />
  );
};

export default NotFound;
