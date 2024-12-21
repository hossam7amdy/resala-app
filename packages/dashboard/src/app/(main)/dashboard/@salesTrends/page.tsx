import { getSalesTrends } from '@/actions/dashboard';
import { SalesTrendsChart } from '@/features/dashboard';
import { Card } from 'antd';
import React from 'react';

const SalesTrends = async () => {
  const data = await getSalesTrends();

  return (
    <Card size="small" title="Sales trends">
      <SalesTrendsChart data={data} />
    </Card>
  );
};

export default SalesTrends;
