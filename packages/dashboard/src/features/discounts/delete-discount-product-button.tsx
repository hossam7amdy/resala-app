'use client';

import { removeProductsFromDiscount } from '@/actions/discount';
import { PopconfirmDeleteButton } from '@/components';
import type { Params } from '@/types';
import { useParams } from 'next/navigation';
import React from 'react';

export const DeleteDiscountProductButton: React.FC<{ productId: string }> = ({ productId }) => {
  const params = useParams<Params>();

  return (
    <PopconfirmDeleteButton
      title="Are you sure you want to delete this product from the discount?"
      onConfirmDelete={() => removeProductsFromDiscount(params.id, [productId])}
    />
  );
};
