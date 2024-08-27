import { Logo } from '@/components';
import { Flex } from 'antd';

import { ConfirmEmailForm } from './confirm-email-form';
import styles from './page.module.css';

const ConfirmEmailPage = ({ searchParams }: { searchParams: { token?: string } }) => {
  return (
    <div className={styles.container}>
      <Flex vertical gap={10}>
        <div style={{ alignSelf: 'center' }}>
          <Logo />
        </div>
        <ConfirmEmailForm token={searchParams.token} />
      </Flex>
    </div>
  );
};
export default ConfirmEmailPage;
