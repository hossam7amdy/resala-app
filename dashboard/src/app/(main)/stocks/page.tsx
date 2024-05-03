import StocksTable from '@/components/stocks/table';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Button, Col, Row, Table } from 'antd';
import Link from 'next/link';
import React, { Suspense } from 'react';

const StocksPage = ({ searchParams }: { searchParams: { page: string; limit: string } }) => {
  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 10;

  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Stocks' }]} />
      </Col>
      <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary">
          <Link href={ROUTES.CREATE_STOCK('')}>Create New Stock</Link>
        </Button>
      </Col>
      <Col span={24}>
        <Suspense key={page + limit} fallback={<Table loading />}>
          <StocksTable searchParams={{ page, limit }} />
        </Suspense>
      </Col>
    </Row>
  );
};

export default StocksPage;
