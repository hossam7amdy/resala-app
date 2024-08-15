import { BackButton } from '@/components';
import { findStockById } from '@/data/stocks';
import { FormSkeleton, SelectColor, SelectProduct, SelectSize, StockForm } from '@/features/stocks';
import { ROUTES } from '@/utils/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import SkeletonInput from 'antd/es/skeleton/Input';
import Link from 'next/link';
import React, { Suspense } from 'react';

const EditStockPage = ({ params }: { params: { id: string } }) => {
  return (
    <Row gutter={[10, 20]}>
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
    <StockForm
      stock={{
        colorId: stock.color.id,
        productId: stock.product.id,
        id: stock.sizes[0].stockId,
        sizeId: stock.sizes[0].sizeId,
        quantity: stock.sizes[0].quantity,
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
