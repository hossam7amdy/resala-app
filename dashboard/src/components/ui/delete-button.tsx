'use client';

import { DeleteFilled } from '@ant-design/icons';
import { Button, ButtonProps, Flex, Popover } from 'antd';
import Text from 'antd/es/typography/Text';
import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import ErrorMessage from './error-message';

interface DeleteButtonProps extends Pick<ButtonProps, 'disabled'> {
  deleteAction: () => Promise<any>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const DeleteButton = ({ deleteAction, ...props }: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const [error, dispatch] = useFormState(deleteAction, undefined);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      placement="topLeft"
      content={
        <form action={dispatch}>
          {error?.message && <ErrorMessage message={error.message} />}
          <SubmitButton onCancel={hide} />
        </form>
      }
      title="Are you sure?"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button
        size="small"
        danger
        type="link"
        onClick={() => setOpen(true)}
        icon={<DeleteFilled />}
        {...props}
      />
    </Popover>
  );
};

const SubmitButton = ({ onCancel }: { onCancel: () => void }) => {
  const { pending } = useFormStatus();

  return (
    <Flex gap={5} justify="flex-end">
      <Button size="small" onClick={onCancel} disabled={pending}>
        Cancel
      </Button>
      <Button size="small" htmlType="submit" type="primary" danger loading={pending}>
        Delete
      </Button>
    </Flex>
  );
};

export default DeleteButton;
