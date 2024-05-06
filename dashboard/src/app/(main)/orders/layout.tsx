import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders',
};

const OrdersLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default OrdersLayout;
