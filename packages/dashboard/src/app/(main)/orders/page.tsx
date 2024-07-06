import { Search } from '@/components';
import OrdersTable from '@/features/orders/table';
import { Breadcrumb, Col, Row, Table } from 'antd';
import { Suspense } from 'react';

const OrdersPage = ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; query?: string };
}) => {
  const query = searchParams?.query || '';
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Orders' }]} />
      </Col>

      <Col span={24}>
        <Search placeholder="Search orders" />
      </Col>

      <Col span={24}>
        <Suspense key={query + page + limit} fallback={<Table loading />}>
          <OrdersTable page={page} limit={limit} query={query} />
        </Suspense>
      </Col>
    </Row>
  );
};

export default OrdersPage;
