'use client';

import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Result, Space } from 'antd';
import { useRouter } from 'next/navigation';

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const router = useRouter();

  return (
    <Result
      status="404"
      title={error.message}
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Space>
          <Button type="primary" onClick={router.back} icon={<ArrowLeftOutlined />}>
            Back
          </Button>
          <Button onClick={reset} icon={<ReloadOutlined />}>
            Reset
          </Button>
        </Space>
      }
    />
  );
};

export default ErrorPage;
