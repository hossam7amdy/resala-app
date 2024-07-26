'use client';

import { useMutation, useNotification } from '@/hooks';
import { DeleteFilled } from '@ant-design/icons';
import { Button, type ButtonProps, Popconfirm } from 'antd';
import React from 'react';

import { Tooltip } from '.';

interface PopconfirmDeleteButtonProps extends Pick<ButtonProps, 'disabled'> {
  onConfirmDelete: () => Promise<void>;
}

export const PopconfirmDeleteButton: React.FC<PopconfirmDeleteButtonProps> = ({
  onConfirmDelete,
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
      title="Are you sure?"
      trigger="click"
      onConfirm={mutate}
      okText="Yes"
      okButtonProps={{ danger: true, loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <Tooltip title="Delete">
        <Button size="small" danger type="link" icon={<DeleteFilled />} {...props} />
      </Tooltip>
    </Popconfirm>
  );
};
