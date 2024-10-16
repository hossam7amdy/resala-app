import { Pagination } from '@/components';
import { ProductsTable } from '@/features/products';
import { listProducts } from '@/fetch/products';
import type { ListRequestQuery } from '@resala/shared';
import { Flex } from 'antd';

const ProductPage = async ({ searchParams }: { searchParams?: ListRequestQuery['query'] }) => {
  const { products, pagination } = await listProducts(searchParams ?? {});

  return (
    <Flex vertical align="center" gap={10}>
      <ProductsTable products={products} />
      <Pagination totalPages={pagination.total} />
    </Flex>
  );
};

export default ProductPage;
