import { DiscountEditor } from '@/features/discounts';
import { findDiscountById } from '@/fetch/discount';
import { notFound } from 'next/navigation';

const EditDiscountPage = async ({ params }: { params: { id: string } }) => {
  const { products, ...discount } = await findDiscountById(params.id, { limit: 100 });

  if (!discount) {
    notFound();
  }

  return <DiscountEditor discount={discount} productIds={products.map(p => p.id)} />;
};

export default EditDiscountPage;
