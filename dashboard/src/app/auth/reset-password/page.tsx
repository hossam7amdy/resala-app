import { Logo } from '@/components/ui/logo';
import ROUTES from '@/lib/routes';
import { Flex } from 'antd';
import Link from 'next/link';
import React from 'react';

import styles from './page.module.css';
import EmailForm from './reset-form';

const ResetPasswordPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Flex vertical gap={10}>
          <div style={{ alignSelf: 'center' }}>
            <Logo />
          </div>
          <EmailForm />
          <Link href={ROUTES.LOGIN}>Back to Login</Link>
        </Flex>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
