import { TopProductsChart } from '@/features/dashboard';
import { listTopProducts } from '@/fetch/dashboard';
import { Card } from 'antd';
import React from 'react';

const TopProducts = async () => {
  const data = await listTopProducts();

  return (
    <Card size="small" title="Top selling products" className="h-full">
      <TopProductsChart products={data} />
    </Card>
  );
};

export default TopProducts;
