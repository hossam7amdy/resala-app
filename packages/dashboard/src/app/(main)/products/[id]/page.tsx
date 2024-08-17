import { BackButton } from '@/components';
import { listStocks } from '@/data/stocks';
import { StocksTable } from '@/features/stocks';
import { ROUTES } from '@/utils/routes';
import { Breadcrumb, Button, Col, Flex, Row } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = { title: 'Product Stocks' };

const ProductStocksPage = async ({ params }: { params: { id: string } }) => {
  const { stocks } = await listStocks({
    productId: +params.id,
    page: 1,
    limit: 50,
  });

  if (!stocks) {
    return notFound();
  }

  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.PRODUCTS}>Products</Link> },
            { title: 'Stocks' },
          ]}
        />
      </Col>
      <Col span={24}>
        <Flex justify="end">
          <Link href={ROUTES.CREATE_STOCK(params.id)}>
            <Button type="primary">Add Stock</Button>
          </Link>
        </Flex>
      </Col>
      <Col span={24}>
        <StocksTable stocks={stocks} pagination={{ page: 1, limit: 10, total: stocks.length }} />
      </Col>
    </Row>
  );
};

export default ProductStocksPage;
