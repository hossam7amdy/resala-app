'use client';

import { useMutation, useNotification } from '@/hooks';
import { DeleteFilled } from '@ant-design/icons';
import { Button, type ButtonProps, Flex, Form, Popover } from 'antd';
import React, { useState } from 'react';

import { Tooltip } from '.';

interface DeleteButtonProps extends Pick<ButtonProps, 'disabled'> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  deleteAction: () => Promise<any>;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ deleteAction, ...props }) => {
  const [open, setOpen] = useState(false);

  const notification = useNotification();

  const hide = () => {
    setOpen(false);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: deleteAction,
    onSuccess: hide,
    onError: error => {
      notification.error(error.message);
    },
  });

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const DeleteForm = (
    <Form name="delete-form" onFinish={mutate}>
      <Form.Item>
        <Flex gap={5} justify="flex-end">
          <Button size="small" onClick={hide} disabled={isLoading}>
            Cancel
          </Button>
          <Button size="small" htmlType="submit" type="primary" danger loading={isLoading}>
            Delete
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );

  return (
    <Popover
      placement="topLeft"
      content={DeleteForm}
      title="Are you sure?"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Tooltip title="Delete">
        <Button
          size="small"
          danger
          type="link"
          onClick={() => setOpen(true)}
          icon={<DeleteFilled />}
          {...props}
        />
      </Tooltip>
    </Popover>
  );
};
