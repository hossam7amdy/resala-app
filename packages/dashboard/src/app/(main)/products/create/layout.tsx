import { BackButton } from '@/components';
import { ROUTES } from '@/routes';
import { Breadcrumb, Col, Row } from 'antd';
import Link from 'next/link';

interface CreateProductLayoutProps {
  children: React.ReactNode;
}
const CreateProductLayout: React.FC<CreateProductLayoutProps> = ({ children }) => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.PRODUCTS}>Products</Link> },
            { title: 'New' },
          ]}
        />
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default CreateProductLayout;
