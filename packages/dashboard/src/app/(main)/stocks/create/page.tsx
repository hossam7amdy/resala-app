import BackButton from '@/component/back-button';
import EditForm from '@/feature/stocks/form';
import SelectColor from '@/feature/stocks/select-color';
import SelectProduct from '@/feature/stocks/select-product';
import SelectSize from '@/feature/stocks/select-size';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import SkeletonInput from 'antd/es/skeleton/Input';
import Link from 'next/link';
import { Suspense } from 'react';

const CreateStockPage = ({ searchParams }: { searchParams?: { productId?: string } }) => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.STOCKS}>Stocks</Link> },
            { title: 'Edit' },
          ]}
        />
      </Col>

      <Col span={24}>
        <Card>
          <Form productId={searchParams?.productId} />
        </Card>
      </Col>
    </Row>
  );
};

const Form = async ({ productId }: { productId?: string }) => {
  return (
    <EditForm
      stock={{ productId: Number(productId) || undefined }}
      selectSize={
        <Suspense fallback={<SkeletonInput active block size="large" />}>
          <SelectSize />
        </Suspense>
      }
      selectColor={
        <Suspense fallback={<SkeletonInput active block size="large" />}>
          <SelectColor />
        </Suspense>
      }
      selectProduct={<SelectProduct />}
    />
  );
};

export default CreateStockPage;
