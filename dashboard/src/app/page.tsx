import { Logo } from '@/components/ui/logo';
import ROUTES from '@/lib/routes';
import { Button, Flex } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Link from 'next/link';

import styles from './page.module.css';

const Page = () => {
  return (
    <main>
      <div className={styles.container}>
        <Flex vertical gap={10} align="center">
          <div>
            <Logo />
          </div>
          <Paragraph>
            Welcome to the dashboard. You are not logged in. Please login to access the dashboard.
          </Paragraph>
          <Button>
            <Link href={ROUTES.LOGIN}>Login Page</Link>
          </Button>
        </Flex>
      </div>
    </main>
  );
};

export default Page;
