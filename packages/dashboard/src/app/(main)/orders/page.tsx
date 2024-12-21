import { listOrders } from '@/actions/orders';
import { OrdersTable } from '@/features/orders';
import type { ListOrdersRequest } from '@resala/shared';

export const revalidate = 1;

const OrdersPage = async ({ searchParams }: { searchParams?: ListOrdersRequest['query'] }) => {
  const { orders, pagination } = await listOrders({ page: 1, limit: 100, ...searchParams });

  return <OrdersTable total={pagination.total} orders={orders} />;
};

export default OrdersPage;
