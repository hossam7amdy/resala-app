import { Logo } from '@/components';
import { Card } from 'antd';

import { ConfirmEmailForm } from './confirm-email-form';

const ConfirmEmailPage = ({ searchParams }: { searchParams: { token?: string } }) => {
  return (
    <Card className="shadow-lg w-96">
      <div className="text-center">
        <Logo />
      </div>
      <ConfirmEmailForm token={searchParams.token} />
    </Card>
  );
};

export default ConfirmEmailPage;
