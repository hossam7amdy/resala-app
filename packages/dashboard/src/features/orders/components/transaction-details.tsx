'use client';

import { formatCurrency } from '@/utils/currency-formatter';
import { formatDateTime } from '@/utils/date-time-formatter';
import { Empty, Flex, Spin, Typography } from 'antd';
import React from 'react';

import { useTransaction } from '..';

export const TransactionDetails: React.FC<{ transactionId: string }> = ({ transactionId }) => {
  const { isLoading, data } = useTransaction(transactionId);

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: 100 }}>
        <Spin />
      </Flex>
    );
  }

  if (!data) {
    return <Empty />;
  }

  return (
    <Flex gap={5}>
      <div>
        <Typography.Paragraph style={{ fontWeight: 'bold' }}>Transaction ID</Typography.Paragraph>
        <Typography.Paragraph style={{ fontWeight: 'bold' }}>Amount</Typography.Paragraph>
        <Typography.Paragraph style={{ fontWeight: 'bold' }}>Amount refunded</Typography.Paragraph>
        <Typography.Paragraph style={{ fontWeight: 'bold' }}>Status</Typography.Paragraph>
        <Typography.Paragraph style={{ fontWeight: 'bold' }}>Created at</Typography.Paragraph>
      </div>
      <div>
        <Typography.Paragraph>: {data.id}</Typography.Paragraph>
        <Typography.Paragraph>: {formatCurrency(data.amount)}</Typography.Paragraph>
        <Typography.Paragraph>
          : {data.refundedAmount ? formatCurrency(data.refundedAmount) : ''}
        </Typography.Paragraph>
        <Typography.Paragraph>: {data.status}</Typography.Paragraph>
        <Typography.Paragraph>: {formatDateTime(data.createdAt)}</Typography.Paragraph>
      </div>
    </Flex>
  );
};
