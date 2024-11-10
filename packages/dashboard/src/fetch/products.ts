'use server';

import { callEndpoint } from '@/fetch';
import { optimizeImages } from '@/lib/optimize-images';
import { ROUTES } from '@/routes';
import type {
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  UpdateProductResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const listProducts = async (query: ListProductsRequest['query']) => {
  const response = await callEndpoint<ListProductsRequest, ListProductsResponse>(
    ENDPOINT_CONFIGS.listProducts,
    {
      query,
      next: { tags: [ROUTES.PRODUCTS] },
    }
  );

  return response.data;
};

export const findProduct = async (id: string | number) => {
  try {
    const response = await callEndpoint<GetProductRequest, GetProductResponse>(
      ENDPOINT_CONFIGS.getProduct,
      { params: { productId: id.toString() }, next: { tags: [ROUTES.PRODUCTS] } }
    );

    return response.data;
  } catch {
    return null;
  }
};

export const addProduct = async (formData: FormData) => {
  const image = formData.get('image');

  if (image) {
    const optimizedImage = await optimizeImages([image] as File[]);

    formData.delete('image');
    formData.append('image', optimizedImage[0]);
  }

  const response = await callEndpoint<{ body: FormData }, CreateProductResponse>(
    ENDPOINT_CONFIGS.createProduct,
    { body: formData }
  );

  revalidateTag(ROUTES.PRODUCTS);
  return response;
};

export const updateProduct = async (id: number | string, formData: FormData) => {
  const image = formData.get('image');

  if (image) {
    const optimizedImage = await optimizeImages([image] as File[]);

    formData.delete('image');
    formData.append('image', optimizedImage[0]);
  }

  const response = await callEndpoint<{ body: FormData }, UpdateProductResponse>(
    ENDPOINT_CONFIGS.updateProduct,
    { params: { productId: +id }, body: formData }
  );

  revalidateTag(ROUTES.PRODUCTS);
  return response;
};

export const deleteProduct = async (id: number | string) => {
  const response = await callEndpoint<DeleteProductRequest, DeleteProductResponse>(
    ENDPOINT_CONFIGS.deleteProduct,
    {
      params: { productId: id.toString() },
    }
  );

  revalidateTag(ROUTES.PRODUCTS);
  return response;
};
