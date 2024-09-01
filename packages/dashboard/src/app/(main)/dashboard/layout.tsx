import { Breadcrumb, Card, Col, Row } from 'antd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  topProducts: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, topProducts }) => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Dashboard' }]} />
      </Col>

      <Col span={24}>{children}</Col>

      <Col span={24} lg={{ span: 12 }}>
        <Card title="Top Products" size="small" style={{ padding: 0 }}>
          {topProducts}
        </Card>
      </Col>
      <Col span={24} lg={{ span: 12 }}>
        <Card style={{ padding: 0 }} />
      </Col>
    </Row>
  );
};

export default DashboardLayout;
