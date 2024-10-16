import { OrdersTable } from '@/features/orders';
import { listOrders } from '@/fetch/orders';
import type { ListOrdersRequest } from '@resala/shared';

export const revalidate = 1;

const OrdersPage = async ({ searchParams }: { searchParams?: ListOrdersRequest['query'] }) => {
  const { orders, pagination } = await listOrders(searchParams ?? {});

  return <OrdersTable total={pagination.total} orders={orders} />;
};

export default OrdersPage;
