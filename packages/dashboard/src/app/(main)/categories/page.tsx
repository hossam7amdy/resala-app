import { listAllCategories } from '@/actions/category';
import { Search, TableSkeleton } from '@/components';
import { CategoryTable } from '@/features/categories';
import { ROUTES } from '@/routes';
import { Breadcrumb, Button, Col, Flex, Row } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Categories',
};

const CategoryPage = async ({ searchParams }: { searchParams: { search?: string } }) => {
  const search = searchParams.search || '';
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
        <Suspense fallback={<TableSkeleton />}>
          <CategoryTable search={search} categories={categories} />
        </Suspense>
      </Col>
    </Row>
  );
};

export default CategoryPage;
