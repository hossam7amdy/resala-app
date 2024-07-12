import { Breadcrumb, Card, Col, Row, Statistic } from 'antd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardPage = () => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Dashboard' }]} />
      </Col>

      <Col span={6}>
        <Card style={{ height: 200 }}>
          <Statistic title="Active Users" />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ height: 200 }}>
          <Statistic title="Total Sales" />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ height: 200 }}>
          <Statistic title="Total Orders" />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ height: 200 }}>
          <Statistic title="Total Products" />
        </Card>
      </Col>

      <Col span={12}>
        <Card style={{ height: 400 }} />
      </Col>
      <Col span={12}>
        <Card style={{ height: 400 }} />
      </Col>
    </Row>
  );
};

export default DashboardPage;
