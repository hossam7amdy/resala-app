'use client';

import { useMutation, useNotification } from '@/hooks';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';
import React from 'react';

interface PopconfirmDeleteButtonProps extends Omit<PopconfirmProps, 'title'> {
  title?: PopconfirmProps['title'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirmDelete: () => Promise<any>;
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

  const { mutate, isLoading } = useMutation({
    mutationFn: onConfirmDelete,
    onSuccess: () => {
      notification.success('Deleted successfully');
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <Popconfirm
      open={isLoading || undefined}
      placement="topLeft"
      title={title}
      description={description}
      trigger="click"
      onConfirm={mutate}
      okText="Yes"
      cancelText="No"
      okButtonProps={{ danger: true, loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
      disabled={disabled}
      {...props}
    >
      <Button
        size="small"
        danger
        type="link"
        icon={children ? undefined : <DeleteFilled />}
        disabled={disabled}
      >
        {children}
      </Button>
    </Popconfirm>
  );
};
