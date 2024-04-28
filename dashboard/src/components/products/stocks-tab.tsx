import { getProductStocks } from '@/data/product';
import React from 'react';

const StocksTab = async ({ id }: { id: string }) => {
  const stocks = await getProductStocks(id);

  return <pre>{JSON.stringify(stocks, null, 2)}</pre>;
};

export default StocksTab;
