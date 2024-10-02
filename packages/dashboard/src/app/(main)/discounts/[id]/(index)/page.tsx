import { Pagination } from '@/components';
import { DiscountAlertMessage, DiscountProducts } from '@/features/discounts';
import { findDiscountById } from '@/fetch/discount';
import type { Params } from '@/types';
import type { GetDiscountRequest } from '@resala/shared';

interface DiscountProductsPageProps {
  params: Params;
  searchParams: GetDiscountRequest['query'];
}
const DiscountProductsPage: React.FC<DiscountProductsPageProps> = async ({
  params,
  searchParams,
}) => {
  const { pagination, products, ...discount } = await findDiscountById(params.id, searchParams);

  return (
    <>
      <DiscountAlertMessage discount={discount} />
      <DiscountProducts products={products} className="my-2" />
      <Pagination total={pagination.total} />
    </>
  );
};

export default DiscountProductsPage;
