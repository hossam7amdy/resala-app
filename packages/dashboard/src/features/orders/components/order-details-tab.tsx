import { Image } from '@/components';
import { formatCurrency } from '@/utils/currency-formatter';
import type { GetOrderResponse } from '@resala/shared';
import { Flex, List, Typography } from 'antd';
import React from 'react';

export const OrderDetailsTab: React.FC<{ order: GetOrderResponse['data'] }> = ({ order }) => {
  return (
    <div>
      <List
        rowKey={item => item.id}
        dataSource={order.orderItems}
        renderItem={item => (
          <List.Item
            extra={
              <Flex gap={3}>
                <Typography.Text>{formatCurrency(item.price)}</Typography.Text>
                <Typography.Text strong>x {item.quantity}</Typography.Text>
              </Flex>
            }
          >
            <List.Item.Meta
              avatar={<Image src={item.product.imageUrl} alt="primary stock image" width={50} />}
              title={`${item.product.enName} | ${item.product.arName}`}
              description={`ID: ${item.id} | Color: ${item.color} | Size: ${item.size}`}
            />
          </List.Item>
        )}
      />

      <Typography.Paragraph style={{ fontWeight: 'bold' }}>{order.note}</Typography.Paragraph>
    </div>
  );
};
