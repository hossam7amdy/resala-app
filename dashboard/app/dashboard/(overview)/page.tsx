import Title from 'antd/es/typography/Title';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardPage = () => {
  return (
    <main style={{ padding: 10 }}>
      <Title level={2}>Dashboard</Title>
    </main>
  );
};

export default DashboardPage;
