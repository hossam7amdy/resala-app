'use client';

import { useMutation, useNotification } from '@/hooks';
import { DeleteFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import type { ModalFuncProps } from 'antd';
import React from 'react';

interface PopconfirmDeleteButtonProps extends ModalFuncProps {
  description?: React.ReactNode;
  disabled?: boolean;
  onConfirmDelete: () => Promise<unknown>;
}

export const PopconfirmDeleteButton: React.FC<PopconfirmDeleteButtonProps> = ({
  onConfirmDelete,
  children,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  disabled,
  ...props
}) => {
  const notification = useNotification();
  const [modal, contextHolder] = Modal.useModal();
  const { mutate } = useMutation({
    mutationFn: onConfirmDelete,
    onSuccess: () => {
      notification.success('Deleted successfully');
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  const showDeleteConfirm = () => {
    modal.confirm({
      title,
      content: description,
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: mutate,
      ...props,
    });
  };

  return (
    <>
      {contextHolder}
      <Button
        size="small"
        danger
        type="link"
        icon={children ? undefined : <DeleteFilled />}
        disabled={disabled}
        onClick={showDeleteConfirm}
      >
        {children}
      </Button>
    </>
  );
};
