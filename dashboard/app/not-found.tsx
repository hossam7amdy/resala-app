import { Button, Result } from 'antd';
import Link from 'next/link';
import React from 'react';

const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button htmlType="submit" type="primary">
        <Link href="/">Back Home</Link>
      </Button>
    }
  />
);

export default NotFound;
