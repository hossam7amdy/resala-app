'use client';

import type { Size } from '@resala/shared';
import { Button, type ButtonProps, Modal } from 'antd';
import React, { useState } from 'react';

import { SizeForm } from './size-form';

interface SizeEditorModalProps {
  size?: Size;
  children: React.ReactNode;
  buttonProps?: Omit<ButtonProps, 'children' | 'icon'>;
}

export const SizeEditorModal: React.FC<SizeEditorModalProps> = ({
  children,
  buttonProps,
  size,
}) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  const closeModal = () => setOpen(false);

  return (
    <>
      <Button {...buttonProps} onClick={openModal}>
        {children}
      </Button>

      <Modal
        destroyOnClose
        title="Size Editor"
        open={open}
        onCancel={closeModal}
        footer={null}
        maskClosable={false}
      >
        <SizeForm size={size} onCancel={closeModal} />
      </Modal>
    </>
  );
};
