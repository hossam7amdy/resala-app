'use server';

import { ROUTES } from '@/routes';
import { productService } from '@/services';
import { formatError } from '@/utils/formatError';
import { CreateProductSchema, UpdateProductSchema } from '@resala/shared';
import {
  type CreateProductRequest,
  type GetProductResponse,
  type ListProductsRequest,
  type ListProductsResponse,
  type UpdateProductRequest,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const listProducts = async (
  query: ListProductsRequest['query']
): Promise<ListProductsResponse['data']> => {
  return await productService.list(query);
};

export const findProduct = async (id: string): Promise<GetProductResponse['data']> => {
  try {
    return await productService.get(id);
  } catch {
    return notFound();
  }
};

export const addProduct = async (product: CreateProductRequest['body']) => {
  try {
    product = CreateProductSchema.shape.body.parse(product);
    const data = await productService.create(product);

    revalidatePath(ROUTES.PRODUCTS);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const updateProduct = async (id: string, product: UpdateProductRequest['body']) => {
  try {
    product = UpdateProductSchema.shape.body.parse(product);
    const data = await productService.update(id, product);

    revalidatePath(ROUTES.PRODUCTS);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const data = await productService.delete(id);

    revalidatePath(ROUTES.PRODUCTS);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};
