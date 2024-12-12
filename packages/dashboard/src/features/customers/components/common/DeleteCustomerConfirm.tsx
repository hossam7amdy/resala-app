import { type GetUserResponse, Role } from '@resala/shared';
import { Modal } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';

import { useDeleteCustomer } from '../../hooks';

interface DeleteCustomerConfirmProps {
  user: GetUserResponse['data'];
}

const DeleteCustomerConfirm = forwardRef(({ user }: DeleteCustomerConfirmProps, ref) => {
  const [modal, contextHolder] = Modal.useModal();
  const { deleteCustomer } = useDeleteCustomer();

  const isUserHasOrders = user.ordersCount > 0;
  const isUserIsAdmin = user.role === Role.ADMIN;

  const confirmDelete = () => {
    modal.confirm({
      title: `Are you sure you want to Delete ${user.name}?`,
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
          This customer can&apos;t be deleted because he have:
          {isUserHasOrders && <li>Personal orders.</li>}
          {isUserIsAdmin && <li>Admin role.</li>}
        </ul>
      ),
      okText: 'Cancel',
    });
  };

  const canDelete = !isUserHasOrders && !isUserIsAdmin;
  useImperativeHandle(ref, () => ({
    confirmDelete: canDelete ? confirmDelete : infoDelete,
  }));

  return <>{contextHolder}</>;
});

DeleteCustomerConfirm.displayName = 'DeleteCustomerConfirm';

export { DeleteCustomerConfirm };
