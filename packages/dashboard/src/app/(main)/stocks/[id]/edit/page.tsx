import { FormSkeleton, SelectColor, SelectSize, StockForm } from '@/features/stocks';
import { findStockById } from '@/fetch/stocks';
import type { Params } from '@/types';
import { Card } from 'antd';
import SkeletonInput from 'antd/es/skeleton/Input';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

const EditStockPage = ({ params }: { params: Params }) => {
  return (
    <Card>
      <Suspense fallback={<FormSkeleton />}>
        <Form id={params.id} />
      </Suspense>
    </Card>
  );
};

const Form = async ({ id }: { id: string }) => {
  const stock = await findStockById(id);

  if (!stock) {
    return notFound();
  }

  return (
    <StockForm
      stock={{
        colorId: stock.color.id,
        productId: stock.product.id,
        id: stock.id,
        sizeId: stock.sizeId,
        quantity: stock.quantity,
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
    />
  );
};

export default EditStockPage;
