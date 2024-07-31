import type { Payment, PaymentStatusType } from '@resala/shared';
import { Space } from 'antd';
import React from 'react';

import { RefundButton } from './refund-button';
import { VoidButton } from './void-button';

interface PaymentActionsButtonsProps {
  payment: Payment;
  orderDate: string;
  orderAmount: number;
  paymentStatus: PaymentStatusType;
}

export const PaymentActionsButtons: React.FC<PaymentActionsButtonsProps> = ({
  payment,
  orderDate,
  orderAmount,
  paymentStatus,
}) => {
  const isPaid = paymentStatus === 'PAID';

  if (!isPaid) {
    return null;
  }

  return (
    <Space>
      <VoidButton payment={payment} orderDate={orderDate} />
      <RefundButton payment={payment} orderAmount={orderAmount} />
    </Space>
  );
};
