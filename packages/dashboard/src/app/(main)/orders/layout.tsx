import { Search } from '@/components';
import { Breadcrumb, Col, Row } from 'antd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders',
};

const OrdersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Orders' }]} />
      </Col>

      <Col span={24}>
        <Search placeholder="Search orders" />
      </Col>

      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default OrdersLayout;
