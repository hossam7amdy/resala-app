import { BackButton } from '@/components';
import { ROUTES } from '@/routes';
import type { Params } from '@/types';
import { Breadcrumb, Col, Row } from 'antd';
import Link from 'next/link';

interface EditProductPageProps {
  params: Params;
  children: React.ReactNode;
}
const EditProductLayout: React.FC<EditProductPageProps> = ({ params, children }) => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.PRODUCTS}>Products</Link> },
            { title: 'Edit' },
            { title: params?.id },
          ]}
        />
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default EditProductLayout;
