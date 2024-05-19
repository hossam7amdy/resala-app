'use client';

import { updateProduct } from '@/actions/product';
import type { GetProductResponse } from '@resala/shared';
import useMessage from 'antd/es/message/useMessage';
import React from 'react';
import { useFormState } from 'react-dom';

import SubmitButton from '../ui/submit-button';

const DisableButton = ({ product }: { product: GetProductResponse['data'] }) => {
  const handleDisable = updateProduct.bind(null, product.id, {
    ...product,
    deletedAt: product.deletedAt ? undefined : new Date(),
  });
  const [error, dispatch] = useFormState(handleDisable, undefined);

  const [messageApi, contextHolder] = useMessage();

  if (error) {
    messageApi.error(error.message);
  }

  const disabled = !!product.deletedAt;
  return (
    <form action={dispatch}>
      {contextHolder}
      <input type="hidden" name="enName" value={product.enName} />
      <SubmitButton size="small" danger={!disabled}>
        {disabled ? 'Enable' : 'Disable'}
      </SubmitButton>
    </form>
  );
};

export default DisableButton;
