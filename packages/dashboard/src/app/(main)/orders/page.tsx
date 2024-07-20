import { listOrders } from '@/data/orders';
import { OrdersTable } from '@/features/orders';
import type { DefaultRequestQuery } from '@resala/shared';

const OrdersPage = async ({ searchParams }: { searchParams: DefaultRequestQuery['query'] }) => {
  const query = searchParams?.query || '';
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const { orders, pagination } = await listOrders({ page, limit, query });

  return <OrdersTable total={pagination.total} orders={orders} />;
};

export default OrdersPage;
