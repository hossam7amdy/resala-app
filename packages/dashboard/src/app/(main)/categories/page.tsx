import { Search } from '@/components';
import { listAllCategories } from '@/data/category';
import { CategoryTable } from '@/features/categories/categories-table';
import { ROUTES } from '@/utils/routes';
import { Breadcrumb, Button, Col, Flex, Row, Table } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Categories',
};

const CategoryPage = async ({ searchParams }: { searchParams: { query?: string } }) => {
  const query = searchParams.query || '';
  const categories = await listAllCategories();

  return (
    <Row gutter={[10, 30]}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Categories' }]} />
      </Col>
      <Col span={24}>
        <Flex gap={10}>
          <Search placeholder="Find category" />
          <Link href={ROUTES.CREATE_CATEGORY}>
            <Button type="primary">Add Category</Button>
          </Link>
        </Flex>
      </Col>
      <Col span={24}>
        <Suspense fallback={<Table loading />}>
          <CategoryTable query={query} categories={categories} />
        </Suspense>
      </Col>
    </Row>
  );
};

export default CategoryPage;
