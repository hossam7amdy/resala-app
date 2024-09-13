import { findProduct } from '@/data/product';
import { listStocks } from '@/data/stocks';
import { StocksTable } from '@/features/stocks';
import { notFound } from 'next/navigation';
import React from 'react';

const ProductStocksPage = async ({ params }: { params: { id: string } }) => {
  const product = await findProduct(params.id);

  if (!product) notFound();

  const { stocks } = await listStocks({ productId: +params.id });

  return <StocksTable stocks={stocks} pagination={{ page: 1, limit: 10, total: stocks.length }} />;
};

export default ProductStocksPage;
