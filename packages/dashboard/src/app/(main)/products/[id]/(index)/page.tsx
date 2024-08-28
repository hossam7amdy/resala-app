import { listStocks } from '@/data/stocks';
import { StocksTable } from '@/features/stocks';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Product stocks',
};

const ProductStocksPage = async ({ params }: { params: { id: string } }) => {
  const { stocks } = await listStocks({ productId: +params.id });

  if (!stocks.length) {
    return notFound();
  }

  return <StocksTable stocks={stocks} pagination={{ page: 1, limit: 10, total: stocks.length }} />;
};

export default ProductStocksPage;
