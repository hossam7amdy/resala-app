import { Table } from 'antd';
import Title from 'antd/es/typography/Title';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CustomerTable } from '../../lib/customers/customer-table';

export const metadata: Metadata = {
  title: 'Customers',
};

const CustomerPage = async () => {
  return (
    <div style={{ padding: 10 }}>
      <Title>Customers</Title>
      <Suspense fallback={<Table loading />}>
        <CustomerTable />
      </Suspense>
    </div>
  );
};

export default CustomerPage;
