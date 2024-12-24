'use client';

import { Image } from '@/components';
import { ROUTES } from '@/routes';
import type { GetInventoryStatusResponse } from '@resala/shared';
import { List, Space, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';

import { StockColor, StockQuantity } from '../stocks';

interface InventoryStatusListProps {
  stocks: (GetInventoryStatusResponse['data']['outOfStock'][0] & {
    stockRemaining?: number;
  })[];
}
export const InventoryStatusList: React.FC<InventoryStatusListProps> = ({ stocks }) => {
  return (
    <List
      dataSource={stocks}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Image width={50} src={item.product.imageUrl} alt={item.product.enName} />}
            title={<Link href={ROUTES.PRODUCT_STOCKS(item.product.id)}>{item.product.enName}</Link>}
            description={
              <Space size="small" align="center">
                <span>Color:</span>
                <StockColor color={item.color.code} /> | <span>Size:</span>
                <span>{item.size.name}</span>
              </Space>
            }
          />
          {item.stockRemaining ? (
            <Space>
              Only
              <StockQuantity quantity={item.stockRemaining} />
              left
            </Space>
          ) : (
            <Typography.Text>Out of stock</Typography.Text>
          )}
        </List.Item>
      )}
    />
  );
};
