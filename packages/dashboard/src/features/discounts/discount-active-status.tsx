'use client';

import { updateDiscount } from '@/fetch/discount';
import { useMutation, useNotification } from '@/hooks';
import type { Discount } from '@resala/shared';
import { Button } from 'antd';
import React from 'react';

interface DiscountActiveStatusProps {
  discount: Discount;
}
export const DiscountActiveStatus: React.FC<DiscountActiveStatusProps> = props => {
  const { id, ...discount } = props.discount;

  const { error } = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: async () => {
      const discountId = id.toString();

      return updateDiscount(discountId, {
        type: discount.type,
        minQty: discount.minQty,
        isActive: !discount.isActive,
        amount: +discount.amount,
      });
    },
    onError: e => {
      error(e.message);
    },
  });

  return (
    <Button size="small" loading={isLoading} danger={discount.isActive} onClick={mutate}>
      {discount.isActive ? 'Disable' : 'Enable'}
    </Button>
  );
};
