'use client';

import { PopconfirmDeleteButton } from '@/components';
import { removeProductsFromDiscount } from '@/fetch/discount';
import type { Params } from '@/types';
import { useParams } from 'next/navigation';
import React from 'react';

export const DeleteDiscountProductButton: React.FC<{ productId: number }> = ({ productId }) => {
  const params = useParams<Params>();

  return (
    <PopconfirmDeleteButton
      title="Are you sure you want to delete this product from the discount?"
      onConfirmDelete={() => removeProductsFromDiscount(params.id, [productId])}
    />
  );
};
