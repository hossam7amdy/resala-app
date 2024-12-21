import { voidPayment } from '@/actions/payments';
import { useMutation, useNotification } from '@/hooks';
import { Button, Popconfirm } from 'antd';
import React from 'react';

export const VoidButton: React.FC<{ transactionId: string; orderDate: string }> = ({
  transactionId,
  orderDate,
}) => {
  const notification = useNotification();

  const { mutate } = useMutation({
    mutationFn: (transactionId: string) => voidPayment({ transactionId }),
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
      onConfirm={() => mutate(transactionId!)}
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
