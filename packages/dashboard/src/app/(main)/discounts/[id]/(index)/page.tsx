import { Pagination } from '@/components';
import { DiscountAlertMessage, DiscountProducts } from '@/features/discounts';
import { AddDiscountProductsModal } from '@/features/discounts/add-discount-products-modal';
import { findDiscountById } from '@/fetch/discount';
import type { Params } from '@/types';
import type { GetDiscountRequest } from '@resala/shared';
import { Flex } from 'antd';
import { notFound } from 'next/navigation';

interface DiscountProductsPageProps {
  params: Params;
  searchParams?: GetDiscountRequest['query'];
}
const DiscountProductsPage: React.FC<DiscountProductsPageProps> = async ({
  params,
  searchParams,
}) => {
  const discount = await findDiscountById(params.id, { page: 1, limit: 100, ...searchParams });

  if (discount?.isStoreWide) {
    notFound();
  }

  return (
    <>
      <Flex align="center" justify="space-between">
        <DiscountAlertMessage discount={discount} />
        <AddDiscountProductsModal discountId={params?.id} />
      </Flex>
      <DiscountProducts products={discount?.products} className="my-2" />
      <Pagination total={discount?.pagination?.total} />
    </>
  );
};

export default DiscountProductsPage;
