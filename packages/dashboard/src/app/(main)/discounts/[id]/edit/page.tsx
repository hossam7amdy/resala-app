import { DiscountEditor } from '@/features/discounts';
import { findDiscountById } from '@/fetch/discount';
import type { Params } from '@/types';

const EditDiscountPage = async ({ params }: { params: Params }) => {
  const { products, ...discount } = await findDiscountById(params.id, { page: 1, limit: 100 });

  return (
    <DiscountEditor
      id={params.id}
      discount={{
        isActive: discount.isActive,
        isStoreWide: discount.isStoreWide,
        type: discount.type,
        minQty: discount.minQty,
        amount: +discount.amount,
        startDate: discount.startDate?.toString(),
        endDate: discount.endDate?.toString(),
        productIds: products.map(({ id }) => id),
      }}
    />
  );
};

export default EditDiscountPage;
