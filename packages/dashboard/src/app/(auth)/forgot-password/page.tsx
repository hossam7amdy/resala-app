import { Logo } from '@/components';
import ROUTES from '@/utils/routes';
import { Flex } from 'antd';
import Link from 'next/link';
import React from 'react';

import EmailForm from './email-form';
import styles from './page.module.css';

const ForgotPasswordPage = () => {
  return (
    <div className={styles.container}>
      <Flex vertical gap={10}>
        <div style={{ alignSelf: 'center' }}>
          <Logo />
        </div>
        <EmailForm />
        <Link href={ROUTES.LOGIN}>Back to Login</Link>
      </Flex>
    </div>
  );
};

export default ForgotPasswordPage;
