import { Pagination } from '@/components';
import type { ListProductsResponse } from '@resala/shared';
import { Flex } from 'antd';

import { TableData } from './table-data';

export const ProductTable: React.FC<ListProductsResponse['data']> = async ({
  products,
  pagination,
}) => {
  return (
    <Flex vertical align="center" gap={10}>
      <TableData products={products} />
      <Pagination totalPages={pagination.total} />
    </Flex>
  );
};
