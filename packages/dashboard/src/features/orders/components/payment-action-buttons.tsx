import type { PaymentStatusType } from '@resala/shared';
import { Space } from 'antd';
import React from 'react';

import { RefundButton } from './refund-button';
import { VoidButton } from './void-button';

interface PaymentActionsButtonsProps {
  transactionId?: string;
  orderDate: string;
  orderAmount: number;
  paymentStatus: PaymentStatusType;
}

export const PaymentActionsButtons: React.FC<PaymentActionsButtonsProps> = ({
  transactionId,
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
      <VoidButton transactionId={transactionId!} orderDate={orderDate} />
      <RefundButton transactionId={transactionId!} orderAmount={orderAmount} />
    </Space>
  );
};
