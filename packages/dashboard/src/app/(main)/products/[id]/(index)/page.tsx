import { findProduct } from '@/actions/products';
import { listStocks } from '@/actions/stocks';
import { Pagination } from '@/components';
import { StocksTable } from '@/features/stocks';
import type { Params } from '@/types';
import { notFound } from 'next/navigation';
import React from 'react';

const ProductStocksPage = async ({ params }: { params: Params }) => {
  const product = await findProduct(params.id);

  if (!product) notFound();

  const stocks = await listStocks({ productId: params.id, page: 1, limit: 100 });

  return (
    <>
      <StocksTable stocks={stocks} />
      <Pagination total={stocks.length} className="mt-2" />
    </>
  );
};

export default ProductStocksPage;
