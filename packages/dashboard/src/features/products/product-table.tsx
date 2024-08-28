'use server';

import { Pagination } from '@/components';
import { listProducts } from '@/data/product';
import type { ListProductsRequest } from '@resala/shared';
import { Flex } from 'antd';

import { TableData } from './table-data';

interface ProductTableProps {
  searchParams?: ListProductsRequest['query'];
}
export const ProductTable = async ({ searchParams }: ProductTableProps) => {
  const { products, pagination } = await listProducts(searchParams ?? {});

  return (
    <Flex vertical align="center" gap={10}>
      <TableData products={products} />
      <Pagination totalPages={pagination.total} />
    </Flex>
  );
};
