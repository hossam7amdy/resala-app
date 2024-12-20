'use client';

import { Button, Flex, Form } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

import { StocksFormList } from './StocksFormList';
import type { StockEditorProps, StockFormValues } from './types';

const StockEditor: React.FC<StockEditorProps> = ({ productDetails, sizes, colors, medias }) => {
  const { back } = useRouter();
  const [form] = Form.useForm<StockFormValues>();

  const handleSubmit = (values: StockFormValues) => {
    console.log('values', values);
  };

  return (
    <Form
      form={form}
      name={`stock-editor`}
      layout="vertical"
      onFinish={handleSubmit}
      scrollToFirstError
    >
      <StocksFormList
        sizes={sizes}
        colors={colors}
        medias={medias}
        variants={productDetails.stocks.map(stock => ({
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
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export { StockEditor };
