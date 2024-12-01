'use server';

import { ROUTES } from '@/routes';
import { stockService } from '@/services';
import type {
  CreateStockRequest,
  CreateStockResponse,
  DeleteStockResponse,
  GetStockResponse,
  ListStocksRequest,
  ListStocksResponse,
  UpdateStockRequest,
  UpdateStockResponse,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const listStocks = async (
  query: ListStocksRequest['query']
): Promise<ListStocksResponse['data']> => {
  return await stockService.list(query);
};

export const findStockById = async (id: string | number): Promise<GetStockResponse['data']> => {
  try {
    return await stockService.find(+id);
  } catch {
    notFound();
  }
};

export const createStock = async (
  stock: CreateStockRequest['body']
): Promise<CreateStockResponse> => {
  try {
    const data = await stockService.create(stock);

    revalidatePath(ROUTES.STOCKS);
    revalidatePath(ROUTES.PRODUCT_STOCKS(stock.productId));
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as CreateStockResponse;
  }
};

export const updateStock = async (
  stockId: string | number,
  stock: UpdateStockRequest['body']
): Promise<UpdateStockResponse> => {
  try {
    const data = await stockService.update(+stockId, stock);
    revalidatePath(ROUTES.STOCKS);
    revalidatePath(ROUTES.PRODUCT_STOCKS(stock.productId));
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as UpdateStockResponse;
  }
};

export const deleteStock = async (stockId: string | number): Promise<DeleteStockResponse> => {
  try {
    const data = await stockService.delete(+stockId);
    revalidatePath(ROUTES.STOCKS);

    return { data };
  } catch (e) {
    return { error: (e as Error).message } as DeleteStockResponse;
  }
};
