import { Pagination } from '@/components';
import { DiscountTable } from '@/features/discounts';
import { listAllDiscounts } from '@/fetch/discount';
import type { ListDiscountsRequest } from '@resala/shared';
import { Card, Flex } from 'antd';

const DiscountsPage: React.FC<{
  searchParams?: ListDiscountsRequest['query'];
}> = async ({ searchParams }) => {
  const { pagination, discounts } = await listAllDiscounts(searchParams ?? {});

  return (
    <Card>
      <DiscountTable discounts={discounts} />
      <Flex justify="center" className="mt-5">
        <Pagination totalPages={pagination.total} />
      </Flex>
    </Card>
  );
};

export default DiscountsPage;
