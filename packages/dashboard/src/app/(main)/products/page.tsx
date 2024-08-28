import { Search } from '@/components';
import { ProductTable } from '@/features/products/product-table';
import { ROUTES } from '@/utils/routes';
import type { ListRequestQuery } from '@resala/shared';
import { Breadcrumb, Button, Col, Flex, Row, Table } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Products',
};

const ProductPage = ({ searchParams }: { searchParams?: ListRequestQuery['query'] }) => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Products' }]} />
      </Col>

      <Col span={24}>
        <Flex gap={10} align="center" justify="space-between">
          <Search placeholder="Find product" />
          <Link href={ROUTES.CREATE_PRODUCT}>
            <Button type="primary">Add Product</Button>
          </Link>
        </Flex>
      </Col>
      <Col span={24}>
        <Suspense key={JSON.stringify(searchParams ?? {})} fallback={<Table loading />}>
          <ProductTable searchParams={searchParams} />
        </Suspense>
      </Col>
    </Row>
  );
};

export default ProductPage;
