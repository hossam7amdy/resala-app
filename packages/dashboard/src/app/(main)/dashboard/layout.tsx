import { Breadcrumb, Col, Row } from 'antd';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Fallback } from './fallback';

export const metadata: Metadata = {
  title: 'Dashboard',
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  topProducts: React.ReactNode;
  salesTrends: React.ReactNode;
  customersFeedback: React.ReactNode;
  inventoryStatus: React.ReactNode;
  ordersStatus: React.ReactNode;
  topCustomers: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  topProducts,
  salesTrends,
  customersFeedback,
  inventoryStatus,
  ordersStatus,
  topCustomers,
}) => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Dashboard' }]} />
      </Col>

      <Col span={24}>
        <Suspense fallback={<Fallback />}>{children}</Suspense>
      </Col>

      <Col span={24} lg={{ span: 12 }}>
        {topProducts}
      </Col>
      <Col span={24} lg={{ span: 12 }}>
        {topCustomers}
      </Col>

      <Col span={24} lg={{ span: 12 }}>
        {salesTrends}
      </Col>
      <Col span={24} lg={{ span: 12 }}>
        {ordersStatus}
      </Col>

      <Col span={24}>{customersFeedback}</Col>

      <Col span={24}>{inventoryStatus}</Col>
    </Row>
  );
};

export default DashboardLayout;
