import { Logo } from '@/components';
import { ROUTES } from '@/utils/routes';
import { Flex } from 'antd';
import Link from 'next/link';

import { LoginForm } from './login-form';
import styles from './page.module.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <Flex vertical gap={10}>
        <div style={{ alignSelf: 'center' }}>
          <Logo />
        </div>
        <LoginForm />
        <Link href={ROUTES.FORGOT_PASSWORD}>Forget password?</Link>
      </Flex>
    </div>
  );
};

export default LoginPage;
