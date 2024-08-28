import { listProducts } from '@/data/product';
import { ProductTable } from '@/features/products/product-table';
import type { ListRequestQuery } from '@resala/shared';

const ProductPage = async ({ searchParams }: { searchParams?: ListRequestQuery['query'] }) => {
  const { products, pagination } = await listProducts(searchParams ?? {});

  return <ProductTable products={products} pagination={pagination} />;
};

export default ProductPage;
