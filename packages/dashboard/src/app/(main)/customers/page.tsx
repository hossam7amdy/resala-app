import { Search } from '@/component/search';
import CustomersTable from '@/feature/customers/table';
import { Breadcrumb, Col, Row, Table } from 'antd';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customers',
};

const CustomerPage = async ({
  searchParams,
}: {
  searchParams?: { page?: string; limit?: string; query?: string };
}) => {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const query = searchParams?.query || '';

  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Customers' }]} />
      </Col>

      <Col span={24}>
        <Search placeholder="Search customers" />
      </Col>

      <Col span={24}>
        <Suspense fallback={<Table loading />}>
          <CustomersTable page={page} limit={limit} query={query} />
        </Suspense>
      </Col>
    </Row>
  );
};

export default CustomerPage;
