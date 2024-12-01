'use server';

import { ROUTES } from '@/routes';
import { discountService } from '@/services';
import type {
  AddProductsToDiscountRequest,
  AddProductsToDiscountResponse,
  CreateDiscountRequest,
  CreateDiscountResponse,
  DeleteDiscountResponse,
  GetDiscountRequest,
  GetDiscountResponse,
  ListDiscountsRequest,
  ListDiscountsResponse,
  RemoveProductsFromDiscountResponse,
  UpdateDiscountRequest,
  UpdateDiscountResponse,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const listAllDiscounts = async (
  query: ListDiscountsRequest['query']
): Promise<ListDiscountsResponse['data']> => {
  return await discountService.list(query);
};

export const findDiscountById = async (
  id: string,
  query: GetDiscountRequest['query']
): Promise<GetDiscountResponse['data']> => {
  try {
    return await discountService.get(id, query);
  } catch {
    return notFound();
  }
};

export const createDiscount = async (
  payload: CreateDiscountRequest['body']
): Promise<CreateDiscountResponse> => {
  try {
    const data = await discountService.create(payload);
    revalidatePath(ROUTES.DISCOUNTS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as CreateDiscountResponse;
  }
};

export const updateDiscount = async (
  id: string,
  payload: UpdateDiscountRequest['body']
): Promise<UpdateDiscountResponse> => {
  try {
    const data = await discountService.update(id, payload);
    revalidatePath(ROUTES.DISCOUNTS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as UpdateDiscountResponse;
  }
};

export const deleteDiscount = async (id: string): Promise<DeleteDiscountResponse> => {
  try {
    const data = await discountService.delete(id);
    revalidatePath(ROUTES.DISCOUNTS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as DeleteDiscountResponse;
  }
};

export const addProductsToDiscount = async (
  id: string,
  { productIds }: AddProductsToDiscountRequest['body']
): Promise<AddProductsToDiscountResponse> => {
  try {
    await discountService.addProducts(+id, productIds);
    revalidatePath(ROUTES.DISCOUNT_PRODUCTS(id));
    return {};
  } catch (e) {
    return { error: (e as Error).message } as AddProductsToDiscountResponse;
  }
};

export const removeProductsFromDiscount = async (
  id: string,
  productIds: number[]
): Promise<RemoveProductsFromDiscountResponse> => {
  try {
    await discountService.removeProducts(+id, productIds);
    revalidatePath(ROUTES.DISCOUNT_PRODUCTS(id));
    return {};
  } catch (e) {
    return { error: (e as Error).message } as RemoveProductsFromDiscountResponse;
  }
};
