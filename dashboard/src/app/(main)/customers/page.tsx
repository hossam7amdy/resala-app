import CustomersTable from '@/components/customers/table';
import { Search } from '@/components/ui/search';
import { Breadcrumb, Button, Col, Flex, Row, Table } from 'antd';
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
        <Flex gap={10}>
          <Search placeholder="Search customers" />
          <Button type="primary">Add Customer</Button>
        </Flex>
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
