import BackButton from '@/component/back-button';
import { findStockById } from '@/data/stocks';
import EditForm from '@/feature/stocks/form';
import FormSkeleton from '@/feature/stocks/form-skeleton';
import SelectColor from '@/feature/stocks/select-color';
import SelectProduct from '@/feature/stocks/select-product';
import SelectSize from '@/feature/stocks/select-size';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import SkeletonInput from 'antd/es/skeleton/Input';
import Link from 'next/link';
import React, { Suspense } from 'react';

const EditStockPage = ({ params }: { params: { id: string } }) => {
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
          <Suspense fallback={<FormSkeleton />}>
            <Form id={params.id} />
          </Suspense>
        </Card>
      </Col>
    </Row>
  );
};

const Form = async ({ id }: { id: string }) => {
  const stock = await findStockById(id);

  return (
    <EditForm
      stock={{
        id: stock.id,
        colorId: stock.color.id,
        sizeId: stock.size.id,
        quantity: stock.quantity,
        productId: stock.product.id,
      }}
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

export default EditStockPage;
