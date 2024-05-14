'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound = () => {
  const router = useRouter();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
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
