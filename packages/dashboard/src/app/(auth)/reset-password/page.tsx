import { Logo } from '@/components';
import { ROUTES } from '@/utils/routes';
import { Flex } from 'antd';
import Link from 'next/link';
import React from 'react';

import styles from './page.module.css';
import { ResetPasswordForm } from './reset-form';

const ResetPasswordPage = ({ searchParams }: { searchParams: { token?: string } }) => {
  return (
    <div className={styles.container}>
      <Flex vertical gap={10}>
        <div style={{ alignSelf: 'center' }}>
          <Logo />
        </div>
        <ResetPasswordForm token={searchParams.token} />
        <Link href={ROUTES.LOGIN}>Back to Login</Link>
      </Flex>
    </div>
  );
};

export default ResetPasswordPage;
