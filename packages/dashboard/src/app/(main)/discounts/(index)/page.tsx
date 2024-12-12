import { DiscountTable } from '@/features/discounts';
import { listAllDiscounts } from '@/fetch/discount';
import type { ListDiscountsRequest } from '@resala/shared';

const DiscountsPage: React.FC<{
  searchParams?: ListDiscountsRequest['query'];
}> = async ({ searchParams }) => {
  const data = await listAllDiscounts({ page: 1, limit: 100, ...searchParams });

  return <DiscountTable data={data ?? {}} />;
};

export default DiscountsPage;
