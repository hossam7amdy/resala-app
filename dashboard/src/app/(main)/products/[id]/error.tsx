'use client';

import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const router = useRouter();

  const message = error.message ? `${error.message}` : 'Sorry, something went wrong.';
  return (
    <Result
      status="404"
      title={message}
      extra={[
        <Button type="primary" key="back" onClick={router.back}>
          Go Back
        </Button>,
        <Button key="reset" onClick={reset}>
          Try Again
        </Button>,
      ]}
    />
  );
};

export default Error;
