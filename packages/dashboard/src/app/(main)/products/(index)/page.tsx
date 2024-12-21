import { listProducts } from '@/actions/products';
import { Pagination } from '@/components';
import { ProductsTable } from '@/features/products';
import type { ListRequestQuery } from '@resala/shared';
import { Flex } from 'antd';

const ProductPage = async ({ searchParams }: { searchParams?: ListRequestQuery['query'] }) => {
  const { products, pagination } = await listProducts({ page: 1, limit: 100, ...searchParams });

  return (
    <Flex vertical align="center" gap={10}>
      <ProductsTable products={products} />
      <Pagination total={pagination.total} />
    </Flex>
  );
};

export default ProductPage;
