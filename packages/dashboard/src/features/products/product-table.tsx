'use server';

import Pagination from '@/components/pagination';
import { listProductsPaginated } from '@/data/product';
import type { DefaultRequestQuery } from '@resala/shared';
import { Flex } from 'antd';

import { TableData } from './table-data';

interface ProductTableProps {
  searchParams: Pick<DefaultRequestQuery['query'], 'page' | 'limit' | 'query'>;
}
export const ProductTable = async ({ searchParams }: ProductTableProps) => {
  const { products, pagination } = await listProductsPaginated(searchParams);

  return (
    <Flex vertical align="center" gap={10}>
      <TableData products={products} />
      <Pagination totalPages={pagination.total} />
    </Flex>
  );
};
