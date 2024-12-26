import { listAllDiscounts } from '@/actions/discount';
import { DiscountTable } from '@/features/discounts';
import type { ListDiscountsRequest } from '@resala/shared';

interface DiscountsPageProps {
  searchParams?: Promise<ListDiscountsRequest['query']>;
}
const DiscountsPage: React.FC<DiscountsPageProps> = async props => {
  const searchParams = await props.searchParams;
  const data = await listAllDiscounts({ page: 1, limit: 100, ...searchParams });

  return <DiscountTable data={data ?? {}} />;
};

export default DiscountsPage;
