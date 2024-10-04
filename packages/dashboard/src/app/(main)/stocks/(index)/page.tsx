import { StocksTable } from '@/features/stocks';
import { listStocks } from '@/fetch/stocks';
import type { ListStocksRequest } from '@resala/shared';
import React from 'react';

const StocksPage: React.FC<{
  searchParams?: ListStocksRequest['query'];
}> = async ({ searchParams }) => {
  const { pagination, stocks } = await listStocks(searchParams ?? {});

  return <StocksTable pagination={pagination} stocks={stocks} />;
};

export default StocksPage;
