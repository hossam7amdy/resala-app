import { voidPayment } from '@/actions/payment';
import { useMutation, useNotification } from '@/hooks';
import type { Payment } from '@resala/shared';
import { Button, Popconfirm } from 'antd';
import React from 'react';

export const VoidButton: React.FC<{ payment: Payment; orderDate: string }> = ({
  payment,
  orderDate,
}) => {
  const notification = useNotification();

  const { mutate } = useMutation({
    mutationFn: (transactionId: number) => voidPayment({ transactionId }),
    onSuccess: () => {
      notification.success('Payment voided successfully');
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  const createdWithin24Hours = new Date(orderDate).getTime() + 24 * 60 * 60 * 1000 > Date.now();
  if (!createdWithin24Hours) {
    return null;
  }

  return (
    <Popconfirm
      overlayStyle={{ maxWidth: '350px' }}
      title="Are you sure you want to void this payment?"
      description="By this action, the payment will be voided and the amount will be refunded to the customer."
      onConfirm={() => mutate(payment.transactionId!)}
      okText="Yes"
      cancelText="No"
      cancelButtonProps={{ type: 'primary' }}
      okButtonProps={{ type: 'default' }}
    >
      <Button size="small" type="primary">
        Void
      </Button>
    </Popconfirm>
  );
};
