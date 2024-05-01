import { CategoryTable } from '@/components/categories/categories-table';
import { Search } from '@/components/ui/search';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Button, Col, Flex, Row, Table } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Categories',
};

const CategoryPage = async ({ searchParams }: { searchParams: { query?: string } }) => {
  const query = searchParams.query || '';

  return (
    <Row gutter={[10, 30]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Categories' }]} />
      </Col>
      <Col span={24}>
        <Flex gap={10}>
          <Search placeholder="Find category" />
          <Button type="primary">
            <Link href={ROUTES.CREATE_CATEGORY}>Create New Category</Link>
          </Button>
        </Flex>
      </Col>
      <Col span={24}>
        <Suspense fallback={<Table loading />}>
          <CategoryTable query={query} />
        </Suspense>
      </Col>
    </Row>
  );
};

export default CategoryPage;
