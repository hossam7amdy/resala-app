import BackButton from '@/components/back-button';
import ROUTES from '@/utils/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Edit Color',
};

const EditColorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.COLORS}>Colors</Link> },
            { title: 'Edit' },
          ]}
        />
      </Col>

      <Col span={24}>
        <Card>{children}</Card>
      </Col>
    </Row>
  );
};

export default EditColorLayout;
