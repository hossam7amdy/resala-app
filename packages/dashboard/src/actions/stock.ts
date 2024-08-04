'use server';

import { callEndpoint } from '@/services/callEndpoint';
import ROUTES from '@/utils/routes';
import type {
  CreateStockRequest,
  CreateStockResponse,
  DeleteStockRequest,
  DeleteStockResponse,
  UpdateStockRequest,
  UpdateStockResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const createStock = async (stock: CreateStockRequest['body']) => {
  const response = await callEndpoint<CreateStockRequest, CreateStockResponse>(
    ENDPOINT_CONFIGS.addStock,
    { body: stock }
  );

  revalidatePath(ROUTES.STOCKS);
  revalidatePath(ROUTES.PRODUCT_STOCKS(stock.productId));
  return response;
};

export const updateStock = async (stockId: string | number, stock: UpdateStockRequest['body']) => {
  const response = await callEndpoint<UpdateStockRequest, UpdateStockResponse>(
    ENDPOINT_CONFIGS.updateStock,
    { params: { stockId: Number(stockId) }, body: stock }
  );

  revalidatePath(ROUTES.STOCKS);
  revalidatePath(ROUTES.PRODUCT_STOCKS(stock.productId));
  return response;
};

export const deleteStock = async (stockId: string | number) => {
  await callEndpoint<DeleteStockRequest, DeleteStockResponse>(ENDPOINT_CONFIGS.deleteStock, {
    params: { stockId: Number(stockId) },
  });

  revalidatePath(ROUTES.STOCKS);
};
