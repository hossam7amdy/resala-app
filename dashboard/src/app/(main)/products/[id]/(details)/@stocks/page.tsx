import { getProductStocks } from '@/data/product';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Product Stocks',
};

const ProductStocksPage = async ({ params }: { params: { id: string } }) => {
  const stocks = await getProductStocks(params.id);
  return <pre>{JSON.stringify(stocks, null, 2)} </pre>;
};

export default ProductStocksPage;
