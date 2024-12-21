'use server';

import { ROUTES } from '@/routes';
import { stockService } from '@/services';
import { formatError } from '@/utils/formatError';
import type {
  GetStockResponse,
  ListStocksRequest,
  ListStocksResponse,
  UpdateStocksQuantityRequest,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const listStocks = async (
  query: ListStocksRequest['query']
): Promise<ListStocksResponse['data']> => {
  return await stockService.list(query);
};

export const findStockById = async (id: string): Promise<GetStockResponse['data']> => {
  try {
    return await stockService.find(id);
  } catch {
    notFound();
  }
};

export const updateStocksQuantity = async (stocks: UpdateStocksQuantityRequest['body']) => {
  try {
    await stockService.updateStocksQuantity(stocks);
    revalidatePath(ROUTES.STOCKS);
    return { data: {} };
  } catch (e) {
    return formatError(e);
  }
};

export const deleteStock = async (stockId: string) => {
  try {
    const data = await stockService.delete(stockId);
    revalidatePath(ROUTES.STOCKS);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const countStocks = async () => {
  return await stockService.count();
};
