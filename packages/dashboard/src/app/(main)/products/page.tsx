import { Search } from '@/component/search';
import { ProductTable } from '@/feature/products/product-table';
import ROUTES from '@/lib/routes';
import type { DefaultRequestQuery } from '@resala/shared';
import { Breadcrumb, Button, Col, Flex, Row, Table } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Products',
};

const ProductPage = ({
  searchParams,
}: {
  searchParams?: Partial<DefaultRequestQuery['query']>;
}) => {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const query = searchParams?.query || '';

  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Products' }]} />
      </Col>

      <Col span={24}>
        <Flex gap={10} align="center" justify="space-between">
          <Search placeholder="Find product" />
          <Link href={ROUTES.CREATE_PRODUCT}>
            <Button type="primary">Create New Product</Button>
          </Link>
        </Flex>
      </Col>
      <Col span={24}>
        <Suspense key={page + limit + query} fallback={<Table loading />}>
          <ProductTable searchParams={{ page, limit, query }} />
        </Suspense>
      </Col>
    </Row>
  );
};

export default ProductPage;
