'use client';

import { ShoppingOutlined } from '@ant-design/icons';
import { Card, Divider, Flex, Space, Typography } from 'antd';
import React from 'react';

interface SummaryOverviewProps {
  ordersCount: number;
}
const SummaryOverview: React.FC<SummaryOverviewProps> = ({ ordersCount }) => {
  return (
    <Card size="small">
      <Flex align="center" justify="space-evenly" gap={10}>
        <Typography.Text type="secondary">
          <ShoppingOutlined /> All time
        </Typography.Text>
        <Divider type="vertical" />
        <Space direction="vertical" align="center">
          <Typography.Text strong>Total orders</Typography.Text>
          <Typography.Text strong>{ordersCount}</Typography.Text>
        </Space>
      </Flex>
    </Card>
  );
};

export { SummaryOverview };
