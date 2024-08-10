'use client';

import type { Color } from '@resala/shared';
import { Button, Modal } from 'antd';
import type { ButtonProps } from 'antd';
import React, { useState } from 'react';

import { ColorEditor } from './color-form';

interface ColorEditorModalProps {
  color?: Color;
  children: React.ReactNode;
  buttonProps?: Omit<ButtonProps, 'children' | 'icon'>;
}
export const ColorEditorModal: React.FC<ColorEditorModalProps> = ({
  children,
  color,
  buttonProps,
}) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  const closeModal = () => setOpen(false);

  return (
    <>
      <Button onClick={openModal} {...buttonProps}>
        {children}
      </Button>

      <Modal
        destroyOnClose
        title="Color Editor"
        open={open}
        onCancel={closeModal}
        footer={null}
        maskClosable={false}
      >
        <ColorEditor color={color} onCancel={closeModal} />
      </Modal>
    </>
  );
};
