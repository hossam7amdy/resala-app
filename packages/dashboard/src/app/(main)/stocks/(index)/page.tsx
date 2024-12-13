import { Pagination } from '@/components';
import { StocksTable } from '@/features/stocks';
import { countStocks, listStocks } from '@/fetch/stocks';
import type { ListStocksRequest } from '@resala/shared';
import React, { Suspense } from 'react';

const StockPagination: React.FC = async () => {
  const total = await countStocks();

  return <Pagination total={total} className="mt-2" />;
};

const StocksPage: React.FC<{
  searchParams?: ListStocksRequest['query'];
}> = async ({ searchParams }) => {
  const stocks = await listStocks({ page: 1, limit: 100, ...searchParams });

  return (
    <>
      <StocksTable stocks={stocks} />
      <Suspense fallback={<></>}>
        <StockPagination />
      </Suspense>
    </>
  );
};

export default StocksPage;
