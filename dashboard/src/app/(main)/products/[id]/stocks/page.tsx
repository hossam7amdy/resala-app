import { getProductStocks } from '@/data/product';
import React from 'react';

const StocksTab = async ({ params }: { params: { id: string } }) => {
  const stocks = await getProductStocks(params.id);

  return <pre>{JSON.stringify(stocks, null, 2)}</pre>;
};

export default StocksTab;
