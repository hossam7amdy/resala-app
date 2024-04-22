'use client';

import { authenticate } from '@/app/lib/action';
import { Logo } from '@/app/ui/logo';
import { Button, Flex, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';
import Link from 'antd/es/typography/Link';
import { useState } from 'react';

import styles from './page.module.css';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: { sign: string; password: string }) => {
    setIsLoading(true);
    try {
      const error = await authenticate(values);
      error && setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Flex vertical gap={10}>
          <div style={{ alignSelf: 'center' }}>
            <Logo />
          </div>
          <Form layout="vertical" size="large" onFinish={onSubmit}>
            <FormItem name="sign" label="Sign" required>
              <Input placeholder="Enter email or phone" autoFocus />
            </FormItem>
            <FormItem name="password" label="Password" required>
              <Password placeholder="Enter password" />
            </FormItem>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button type="primary" block size="large" htmlType="submit" loading={isLoading}>
              Sign in
            </Button>
          </Form>
          <Link href="/auth/forgot-password">Forget password?</Link>
        </Flex>
      </div>
    </main>
  );
};

export default LoginPage;
