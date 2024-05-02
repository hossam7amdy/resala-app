import UploadForm from '@/components/products/upload-form';
import BackButton from '@/components/ui/back-button';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';

const UploadImagesPage = ({ params }: { params: { id: string } }) => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: 'Products', href: ROUTES.PRODUCTS },
            { title: 'Upload' },
          ]}
        />
      </Col>
      <Col span={24}>
        <Card>
          <UploadForm id={params.id} />
        </Card>
      </Col>
    </Row>
  );
};

export default UploadImagesPage;
