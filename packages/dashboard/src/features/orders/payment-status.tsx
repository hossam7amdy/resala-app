import { updateOrderStatus } from '@/actions/order';
import { useMutation, useNotification } from '@/hooks';
import type { GetOrderResponse, PaymentStatusType } from '@resala/shared';
import { PaymentStatus as PaymentStatusEnum } from '@resala/shared';
import { Popconfirm, Select, Tag } from 'antd';
import type { TagProps } from 'antd';
import { useState } from 'react';

export const StatusTag = ({ status }: { status: PaymentStatusType }) => {
  let color: TagProps['color'] = 'default';

  switch (status) {
    case 'UNPAID':
      color = 'warning';
      break;
    case 'PAID':
      color = 'success';
      break;
    case 'FAILED':
      color = 'error';
      break;
  }

  return (
    <Tag style={{ fontWeight: 500, width: 90 }} color={color} bordered={false}>
      {status}
    </Tag>
  );
};

interface PaymentStatusProps {
  order: GetOrderResponse['data'];
}
export const PaymentStatus: React.FC<PaymentStatusProps> = ({ order }) => {
  const { id, orderStatus, paymentStatus } = order;

  const [newPaymentStatus, setNewPaymentStatus] = useState(paymentStatus);

  const notifications = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: updateOrderStatus.bind(null, id),
    onSuccess: () => {
      notifications.success('Order has been updated successfully');
    },
    onError: error => {
      notifications.error(error.message);
    },
  });

  return (
    <Popconfirm
      open={paymentStatus !== newPaymentStatus || isLoading}
      title="Are you sure?"
      description={`to change payment status from ${paymentStatus} to ${newPaymentStatus}`}
      onConfirm={() => mutate({ paymentStatus: newPaymentStatus, orderStatus })}
      onCancel={() => setNewPaymentStatus(paymentStatus)}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <Select
        size="small"
        variant="borderless"
        style={{ width: 'max-content' }}
        value={newPaymentStatus}
        options={[
          {
            label: <StatusTag status={PaymentStatusEnum.UNPAID} />,
            value: PaymentStatusEnum.UNPAID,
            disabled: paymentStatus === PaymentStatusEnum.UNPAID,
          },
          {
            label: <StatusTag status={PaymentStatusEnum.PAID} />,
            value: PaymentStatusEnum.PAID,
            disabled: paymentStatus === PaymentStatusEnum.PAID,
          },
          {
            label: <StatusTag status={PaymentStatusEnum.REFUNDED} />,
            value: PaymentStatusEnum.REFUNDED,
            disabled: paymentStatus === PaymentStatusEnum.REFUNDED,
          },
          {
            label: <StatusTag status={PaymentStatusEnum.VOIDED} />,
            value: PaymentStatusEnum.VOIDED,
            disabled: paymentStatus === PaymentStatusEnum.VOIDED,
          },
          {
            label: <StatusTag status={PaymentStatusEnum.FAILED} />,
            value: PaymentStatusEnum.FAILED,
            disabled: true,
          },
        ]}
        onChange={setNewPaymentStatus}
        disabled={order.paymentMethod === 'CARD'}
      />
    </Popconfirm>
  );
};
