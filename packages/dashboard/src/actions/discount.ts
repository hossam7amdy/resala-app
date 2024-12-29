'use server';

import { ROUTES } from '@/routes';
import { discountService } from '@/services';
import { formatError } from '@/utils/formatError';
import type {
  AddProductsToDiscountRequest,
  CreateDiscountRequest,
  GetDiscountRequest,
  GetDiscountResponse,
  ListDiscountsRequest,
  ListDiscountsResponse,
  UpdateDiscountRequest,
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

export const createDiscount = async (payload: CreateDiscountRequest['body']) => {
  try {
    const data = await discountService.create(payload);
    revalidatePath(ROUTES.DISCOUNTS);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const updateDiscount = async (id: string, payload: UpdateDiscountRequest['body']) => {
  try {
    const data = await discountService.update(id, payload);
    revalidatePath(ROUTES.DISCOUNTS);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const deleteDiscount = async (id: string) => {
  try {
    const data = await discountService.delete(id);
    revalidatePath(ROUTES.DISCOUNTS);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const addProductsToDiscount = async (
  id: string,
  { productIds }: AddProductsToDiscountRequest['body']
) => {
  try {
    await discountService.addProducts(id, productIds!);
    revalidatePath(ROUTES.DISCOUNT_PRODUCTS(id));
    return {};
  } catch (e) {
    return formatError(e);
  }
};

export const removeProductsFromDiscount = async (id: string, productIds: string[]) => {
  try {
    await discountService.removeProducts(id, productIds);
    revalidatePath(ROUTES.DISCOUNT_PRODUCTS(id));
    return {};
  } catch (e) {
    return formatError(e);
  }
};
