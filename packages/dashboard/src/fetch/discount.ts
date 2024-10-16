'use server';

import { callEndpoint } from '@/fetch';
import { ROUTES } from '@/routes';
import type {
  AddProductsToDiscountRequest,
  AddProductsToDiscountResponse,
  CreateDiscountRequest,
  CreateDiscountResponse,
  DeleteDiscountRequest,
  DeleteDiscountResponse,
  GetDiscountRequest,
  GetDiscountResponse,
  ListDiscountsRequest,
  ListDiscountsResponse,
  RemoveProductsFromDiscountRequest,
  RemoveProductsFromDiscountResponse,
  UpdateDiscountRequest,
  UpdateDiscountResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

export const listAllDiscounts = async (query: ListDiscountsRequest['query']) => {
  return await callEndpoint<ListDiscountsRequest, ListDiscountsResponse>(
    ENDPOINT_CONFIGS.listDiscounts,
    {
      query,
      next: { tags: [ROUTES.DISCOUNTS] },
    }
  );
};

export const findDiscountById = async (id: string, query: GetDiscountRequest['query']) => {
  const response = await callEndpoint<GetDiscountRequest, GetDiscountResponse>(
    ENDPOINT_CONFIGS.getDiscount,
    { params: { discountId: id.toString() }, query, next: { tags: [ROUTES.DISCOUNT_PRODUCTS(id)] } }
  );

  if (response.statusCode === 404) {
    return notFound();
  }

  return response.data;
};

export const createDiscount = async (payload: CreateDiscountRequest['body']) => {
  const response = await callEndpoint<CreateDiscountRequest, CreateDiscountResponse>(
    ENDPOINT_CONFIGS.createDiscount,
    { body: payload }
  );

  revalidateTag(ROUTES.DISCOUNTS);
  return response;
};

export const updateDiscount = async (id: string, payload: UpdateDiscountRequest['body']) => {
  const response = await callEndpoint<UpdateDiscountRequest, UpdateDiscountResponse>(
    ENDPOINT_CONFIGS.updateDiscount,
    { params: { discountId: id }, body: payload }
  );

  revalidateTag(ROUTES.DISCOUNTS);
  return response;
};

export const deleteDiscount = async (id: string) => {
  const response = await callEndpoint<DeleteDiscountRequest, DeleteDiscountResponse>(
    ENDPOINT_CONFIGS.deleteDiscount,
    { params: { discountId: id } }
  );

  revalidateTag(ROUTES.DISCOUNTS);
  return response;
};

export const addProductsToDiscount = async (
  id: string,
  { productIds }: AddProductsToDiscountRequest['body']
) => {
  const response = await callEndpoint<AddProductsToDiscountRequest, AddProductsToDiscountResponse>(
    ENDPOINT_CONFIGS.addProductsToDiscount,
    { params: { discountId: id }, body: { productIds } }
  );

  revalidateTag(ROUTES.DISCOUNT_PRODUCTS(id));
  return response;
};

export const removeProductsFromDiscount = async (id: string, productIds: number[]) => {
  const response = await callEndpoint<
    RemoveProductsFromDiscountRequest,
    RemoveProductsFromDiscountResponse
  >(ENDPOINT_CONFIGS.removeProductsFromDiscount, {
    params: { discountId: id },
    query: { productIds },
  });

  revalidateTag(ROUTES.DISCOUNT_PRODUCTS(id));
  return response;
};
