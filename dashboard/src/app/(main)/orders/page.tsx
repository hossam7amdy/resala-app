import { Breadcrumb, Col, Row, Table } from 'antd';
import Search from 'antd/es/input/Search';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders',
};

const OrdersPage = async () => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Orders' }]} />
      </Col>

      <Col span={24}>
        <Search placeholder="Search orders" />
      </Col>

      <Col span={24}>
        <Table />
      </Col>
    </Row>
  );
};

export default OrdersPage;
