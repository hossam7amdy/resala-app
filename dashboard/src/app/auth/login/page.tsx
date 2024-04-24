import { Logo } from '@/app/ui/logo';
import { Flex } from 'antd';
import Link from 'antd/es/typography/Link';

import LoginForm from './login-form';
import styles from './page.module.css';

const LoginPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Flex vertical gap={10}>
          <div style={{ alignSelf: 'center' }}>
            <Logo />
          </div>
          <LoginForm />
          <Link href="/auth/forgot-password">Forget password?</Link>
        </Flex>
      </div>
    </main>
  );
};

export default LoginPage;
