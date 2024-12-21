'use client';

import { useCreateOrUpdateProduct } from '@/features/products';
import { Button, Flex, Form } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

import { StocksFormList } from './StocksFormList';
import type { StockEditorProps, StockFormValues } from './types';

const StockEditor: React.FC<StockEditorProps> = ({ productDetails, sizes, colors, medias }) => {
  const { stocks, ...product } = productDetails;

  const { back } = useRouter();
  const [form] = Form.useForm();
  const { handleSubmit, isLoading } = useCreateOrUpdateProduct({
    form,
    productId: product.id,
    isEdit: true,
  });

  return (
    <Form
      form={form}
      name={`stock-editor`}
      layout="vertical"
      onFinish={({ variants }: StockFormValues) =>
        handleSubmit({
          variants,
          image: {
            id: product.imageKey,
            url: product.imageUrl,
          },
          ...product,
          price: +product.price,
        })
      }
      scrollToFirstError
    >
      <StocksFormList
        sizes={sizes}
        colors={colors}
        medias={medias}
        variants={stocks.map(stock => ({
          color: stock.color.id,
          medias: stock.images.map(img => ({ id: img.imageKey, url: img.imageUrl })),
          sizes: stock.sizes.map(size => ({
            size: size.sizeId,
            quantity: size.quantity,
          })),
        }))}
      />

      <Form.Item className="mt-4">
        <Flex gap={10}>
          <Button type="default" block onClick={back}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export { StockEditor };
