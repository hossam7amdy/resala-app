import StocksTable from '@/components/stocks/table';
import { Search } from '@/components/ui/search';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Button, Col, Flex, Row, Table } from 'antd';
import Link from 'next/link';
import React, { Suspense } from 'react';

const StocksPage = ({
  searchParams,
}: {
  searchParams: { query: string; page: string; limit: string };
}) => {
  const query = searchParams.query || '';
  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 10;

  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Stocks' }]} />
      </Col>
      <Col span={24}>
        <Flex gap={10}>
          <Search />
          <Link href={ROUTES.CREATE_STOCK('')}>
            <Button type="primary">Create New Stock</Button>
          </Link>
        </Flex>
      </Col>
      <Col span={24}>
        <Suspense key={query + page + limit} fallback={<Table loading />}>
          <StocksTable searchParams={{ query, page, limit }} />
        </Suspense>
      </Col>
    </Row>
  );
};

export default StocksPage;
