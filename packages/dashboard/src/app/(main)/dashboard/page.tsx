import { getOverview } from '@/data/dashboard';
import { formatCurrency } from '@/utils/currency-formatter';
import { Card, Col, Row, Statistic } from 'antd';

export const revalidate = 5;

const DashboardPage = async () => {
  const { totalProducts, totalOrders, totalCustomers, totalSales, totalRefund, totalRevenue } =
    await getOverview();

  return (
    <Row gutter={[10, 20]}>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card hoverable style={{ height: 200 }}>
          <Statistic title="Total Customers" value={totalCustomers} />
        </Card>
      </Col>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card hoverable style={{ height: 200 }}>
          <Statistic title="Total Products" value={totalProducts} />
        </Card>
      </Col>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card hoverable style={{ height: 200 }}>
          <Statistic title="Total Orders" value={totalOrders} />
        </Card>
      </Col>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card hoverable style={{ height: 200 }}>
          <Statistic title="Total Sales" value={formatCurrency(totalSales)} />
        </Card>
      </Col>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card hoverable style={{ height: 200 }}>
          <Statistic title="Total Revenue" value={formatCurrency(totalRevenue)} />
        </Card>
      </Col>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card hoverable style={{ height: 200 }}>
          <Statistic title="Total Refund" value={formatCurrency(totalRefund)} />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardPage;
