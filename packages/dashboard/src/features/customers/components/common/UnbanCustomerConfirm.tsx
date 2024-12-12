import { formatDateTime } from '@/utils/date-time-formatter';
import { type User } from '@resala/shared';
import { Modal } from 'antd';
import React from 'react';

import { useUnbanCustomer } from '../../hooks';

interface UnbanCustomerConfirmProps {
  user: User;
  renderTrigger: (trigger: () => void) => React.ReactNode;
}

const UnbanCustomerConfirm: React.FC<UnbanCustomerConfirmProps> = ({ user, renderTrigger }) => {
  const { unbanCustomer } = useUnbanCustomer();
  const [modal, contextHolder] = Modal.useModal();

  const confirmUnban = () => {
    modal.confirm({
      title: `Are you sure you want to unban ${user.firstName} ${user.lastName}?`,
      content: (
        <div>
          <p>Ban reason: {user.banReason}</p>
          <p>
            Ban until: {user?.banExpires ? formatDateTime(new Date(user.banExpires)) : 'Forever'}
          </p>
        </div>
      ),
      onOk: () => unbanCustomer({ userId: user.id }),
      okText: 'Confirm',
      cancelText: 'Cancel',
    });
  };

  return (
    <>
      {contextHolder}
      {renderTrigger(confirmUnban)}
    </>
  );
};

export { UnbanCustomerConfirm };
