import { NotificationError } from '@/components';
import { DiscountTable } from '@/features/discounts';
import { listAllDiscounts } from '@/fetch/discount';
import type { ListDiscountsRequest } from '@resala/shared';

const DiscountsPage: React.FC<{
  searchParams?: ListDiscountsRequest['query'];
}> = async ({ searchParams }) => {
  const { data, statusCode, message } = await listAllDiscounts(searchParams ?? {});

  return (
    <>
      <NotificationError statusCode={statusCode} message={message} />
      <DiscountTable data={data ?? {}} />
    </>
  );
};

export default DiscountsPage;
