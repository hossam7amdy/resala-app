'use client';

import type { Params } from '@/types';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

import { AddDiscountProductsForm } from './add-discount-products-form';

interface AddDiscountProductsModalProps {
  discountId?: string;
}
export const AddDiscountProductsModal: React.FC<AddDiscountProductsModalProps> = ({
  discountId,
}) => {
  const params = useParams<Params>();
  const [open, setOpen] = useState(false);

  const onFinished = () => setOpen(false);
  const onCanceled = () => setOpen(false);

  discountId = discountId ?? params.id;

  return (
    <>
      <Modal
        open={open}
        maskClosable={false}
        title="Add products to discount"
        footer={null}
        onCancel={onCanceled}
        destroyOnClose
      >
        <AddDiscountProductsForm
          discountId={discountId}
          onFinished={onFinished}
          onCanceled={onCanceled}
        />
      </Modal>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
        Add products
      </Button>
    </>
  );
};
