'use server';

import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
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
import { redirect } from 'next/navigation';

export const createStock = async (stock: CreateStockRequest['body']) => {
  try {
    const response = await callEndpoint<CreateStockRequest, CreateStockResponse>(
      ENDPOINT_CONFIGS.addStock,
      {
        body: stock,
      }
    );

    revalidatePath(ROUTES.STOCKS);
    revalidatePath(ROUTES.PRODUCT_STOCKS(stock.productId));
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateStock = async (stockId: string | number, stock: UpdateStockRequest['body']) => {
  try {
    await callEndpoint<UpdateStockRequest, UpdateStockResponse>(ENDPOINT_CONFIGS.updateStock, {
      params: { stockId: Number(stockId) },
      body: stock,
    });

    revalidatePath(ROUTES.STOCKS);
    revalidatePath(ROUTES.PRODUCT_STOCKS(stock.productId));
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }

  return redirect(ROUTES.EDIT_STOCK(stockId));
};

export const deleteStock = async (stockId: string | number) => {
  try {
    await callEndpoint<DeleteStockRequest, DeleteStockResponse>(ENDPOINT_CONFIGS.deleteStock, {
      params: { stockId: Number(stockId) },
    });

    revalidatePath(ROUTES.STOCKS);
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};
