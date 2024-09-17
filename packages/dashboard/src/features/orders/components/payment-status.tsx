import { ResalaTooltip } from '@/components';
import { updateOrderStatus } from '@/fetch/orders';
import { useMutation, useNotification } from '@/hooks';
import type { GetOrderResponse, PaymentStatusType } from '@resala/shared';
import { PaymentStatus as PaymentStatusEnum } from '@resala/shared';
import { Popconfirm, Select, Tag } from 'antd';
import type { TagProps } from 'antd';
import { useEffect, useState } from 'react';

export const StatusTag: React.FC<{ status: PaymentStatusType }> = ({ status }) => {
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
export const PaymentStatus: React.FC<PaymentStatusProps> = ({
  order: { id, orderStatus, paymentStatus, paymentMethod },
}) => {
  const notifications = useNotification();

  const [popOpen, setPopOpen] = useState(false);

  const [newPaymentStatus, setNewPaymentStatus] = useState(paymentStatus);

  useEffect(() => {
    setNewPaymentStatus(paymentStatus);
  }, [paymentStatus]);

  const { isLoading, mutate } = useMutation({
    mutationFn: updateOrderStatus.bind(null, id),
    onSuccess: () => {
      notifications.success('Order has been updated successfully');
    },
    onError: error => {
      notifications.error(error.message);
    },
  });

  const onCancel = () => {
    setNewPaymentStatus(paymentStatus);
    setPopOpen(false);
  };

  const onChange = (status: PaymentStatusType) => {
    setNewPaymentStatus(status);
    setPopOpen(true);
  };

  const isOnlinePayment = paymentMethod === 'CARD';
  return (
    <ResalaTooltip title={isOnlinePayment ? 'Online payment cannot be changed' : ''}>
      <Popconfirm
        open={popOpen || isLoading}
        title="Are you sure?"
        description={`to change payment status from ${paymentStatus} to ${newPaymentStatus}`}
        onConfirm={() => mutate({ paymentStatus: newPaymentStatus, orderStatus })}
        onCancel={onCancel}
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
            },
            {
              label: <StatusTag status={PaymentStatusEnum.PAID} />,
              value: PaymentStatusEnum.PAID,
            },
            {
              label: <StatusTag status={PaymentStatusEnum.REFUNDED} />,
              value: PaymentStatusEnum.REFUNDED,
            },
            {
              label: <StatusTag status={PaymentStatusEnum.VOIDED} />,
              value: PaymentStatusEnum.VOIDED,
            },
            {
              label: <StatusTag status={PaymentStatusEnum.FAILED} />,
              value: PaymentStatusEnum.FAILED,
              disabled: true,
            },
          ]}
          onChange={onChange}
          disabled={isOnlinePayment}
        />
      </Popconfirm>
    </ResalaTooltip>
  );
};
