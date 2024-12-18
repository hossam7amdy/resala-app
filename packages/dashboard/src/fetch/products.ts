'use server';

import { ROUTES } from '@/routes';
import { productService } from '@/services';
import { CreateProductSchema, UpdateProductSchema } from '@resala/shared';
import {
  type CreateProductRequest,
  type CreateProductResponse,
  type DeleteProductResponse,
  type GetProductResponse,
  type ListProductsRequest,
  type ListProductsResponse,
  type UpdateProductRequest,
  type UpdateProductResponse,
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

export const addProduct = async (
  product: CreateProductRequest['body']
): Promise<CreateProductResponse> => {
  try {
    product = await CreateProductSchema.shape.body.parseAsync(product);

    const data = await productService.create(product);

    revalidatePath(ROUTES.PRODUCTS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as CreateProductResponse;
  }
};

export const updateProduct = async (
  id: string,
  product: UpdateProductRequest['body']
): Promise<UpdateProductResponse> => {
  try {
    product = await UpdateProductSchema.shape.body.parseAsync(product);

    const data = await productService.update(id, product);

    revalidatePath(ROUTES.PRODUCTS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as UpdateProductResponse;
  }
};

export const deleteProduct = async (id: string): Promise<DeleteProductResponse> => {
  try {
    const data = await productService.delete(id);

    revalidatePath(ROUTES.PRODUCTS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as DeleteProductResponse;
  }
};
