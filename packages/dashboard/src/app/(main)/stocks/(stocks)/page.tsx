import { listStocksPaginated } from '@/data/stocks';
import { StocksTable } from '@/features/stocks';
import React from 'react';

const StocksPage: React.FC<{
  searchParams: { query: string; page: string; limit: string };
}> = async ({ searchParams }) => {
  const query = searchParams.query || '';
  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 10;

  const { pagination, stocks } = await listStocksPaginated({ query, page, limit });

  return <StocksTable pagination={pagination} stocks={stocks} />;
};

export default StocksPage;
