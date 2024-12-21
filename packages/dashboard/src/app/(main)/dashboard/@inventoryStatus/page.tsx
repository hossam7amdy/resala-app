import { getInventoryStatus } from '@/actions/dashboard';
import { InventoryStatusList } from '@/features/dashboard';
import { Card, Tabs } from 'antd';
import React from 'react';

const InventoryStatus = async () => {
  const data = await getInventoryStatus();

  return (
    <Card size="small" title="Inventory status">
      <Tabs
        type="card"
        size="small"
        items={[
          {
            key: 'low-stock',
            label: 'Low stock',
            children: <InventoryStatusList stocks={data.lowStock} />,
          },
          {
            key: 'empty-stock',
            label: 'Out of stock',
            children: <InventoryStatusList stocks={data.outOfStock} />,
          },
        ]}
      />
    </Card>
  );
};

export default InventoryStatus;
