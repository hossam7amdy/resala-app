import { listTopCustomers } from '@/actions/dashboard';
import { TopCustomersChart } from '@/features/dashboard';
import { Card } from 'antd';
import React from 'react';

const TopCustomers = async () => {
  const data = await listTopCustomers();

  return (
    <Card size="small">
      <TopCustomersChart customers={data} />
    </Card>
  );
};

export default TopCustomers;
