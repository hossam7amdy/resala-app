import { type GetUserResponse, Role } from '@resala/shared';
import { Modal } from 'antd';
import React from 'react';

import { useDeleteCustomer } from '../../hooks';

interface DeleteCustomerConfirmProps {
  user: GetUserResponse['data'];
  renderTrigger: (trigger: () => void) => React.ReactNode;
}

const DeleteCustomerConfirm: React.FC<DeleteCustomerConfirmProps> = ({ user, renderTrigger }) => {
  const [modal, contextHolder] = Modal.useModal();
  const { deleteCustomer } = useDeleteCustomer();

  const isUserHasOrders = user.ordersCount > 0;
  const isUserIsAdmin = user.role === Role.ADMIN;

  const confirmDelete = () => {
    modal.confirm({
      title: `Are you sure you want to delete ${user.name}?`,
      content: `This action cannot be undone.`,
      okButtonProps: { danger: true },
      onOk: () => deleteCustomer({ userId: user.id }),
      okText: 'Delete',
      cancelText: 'Cancel',
    });
  };

  const infoDelete = () => {
    modal.info({
      title: `Unable to delete ${user.name}`,
      content: (
        <ul>
          This customer can&apos;t be deleted because:
          {isUserHasOrders && <li>he has personal orders.</li>}
          {isUserIsAdmin && <li>he has an admin role.</li>}
        </ul>
      ),
      okText: 'Cancel',
    });
  };

  const canDelete = !isUserHasOrders && !isUserIsAdmin;
  const handleTrigger = canDelete ? confirmDelete : infoDelete;

  return (
    <>
      {renderTrigger(handleTrigger)} {/* Render the custom trigger */}
      {contextHolder}
    </>
  );
};

export { DeleteCustomerConfirm };
