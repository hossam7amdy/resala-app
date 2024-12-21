import { ResalaLogo } from '@/components';
import { ROUTES } from '@/routes';
import { Flex } from 'antd';
import Link from 'next/link';

import { LoginForm } from './login-form';
import { LoginWithGoogleButton } from './login-with-google-button';
import styles from './page.module.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <Flex vertical gap={10}>
        <div style={{ alignSelf: 'center' }}>
          <ResalaLogo />
        </div>
        <LoginForm />
        <Link href={ROUTES.FORGOT_PASSWORD}>Forget password?</Link>
        <LoginWithGoogleButton />
      </Flex>
    </div>
  );
};

export default LoginPage;
