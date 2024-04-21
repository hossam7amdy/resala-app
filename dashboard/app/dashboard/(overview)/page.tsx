import Title from 'antd/es/typography/Title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Admin Resala',
};

export default async function Page() {
  return (
    <main style={{ padding: 10 }}>
      <Title level={2}>Dashboard</Title>
    </main>
  );
}
