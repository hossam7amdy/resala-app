'use client';

import { DeleteFilled } from '@ant-design/icons';
import { Button, type ButtonProps, Flex, Popover } from 'antd';
import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { Tooltip } from '.';
import ErrorMessage from './error-message';

interface DeleteButtonProps extends Pick<ButtonProps, 'disabled'> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  deleteAction: () => Promise<any>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ deleteAction, ...props }) => {
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
