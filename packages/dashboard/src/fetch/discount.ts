'use server';

import { callEndpoint } from '@/fetch';
import { ROUTES } from '@/routes';
import type {
  CreateDiscountRequest,
  CreateDiscountResponse,
  DeleteDiscountRequest,
  DeleteDiscountResponse,
  GetDiscountRequest,
  GetDiscountResponse,
  ListDiscountsRequest,
  ListDiscountsResponse,
  UpdateDiscountRequest,
  UpdateDiscountResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const listAllDiscounts = async (query: ListDiscountsRequest['query']) => {
  const response = await callEndpoint<ListDiscountsRequest, ListDiscountsResponse>(
    ENDPOINT_CONFIGS.listDiscounts,
    { query, next: { tags: [ROUTES.DISCOUNTS] } }
  );

  return response.data;
};

export const findDiscountById = async (id: string, query: GetDiscountRequest['query']) => {
  const response = await callEndpoint<GetDiscountRequest, GetDiscountResponse>(
    ENDPOINT_CONFIGS.getDiscount,
    { params: { discountId: id.toString() }, query, next: { tags: [ROUTES.DISCOUNTS] } }
  );

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
