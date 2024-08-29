'use server';

import { callEndpoint } from '@/services/callEndpoint';
import { optimizeImages } from '@/services/optimizeImages';
import { ROUTES } from '@/utils/routes';
import type { DeleteProductRequest, DeleteProductResponse } from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const addProduct = async (formData: FormData) => {
  const image = formData.get('image');

  if (image) {
    const optimizedImage = await optimizeImages([image] as File[]);

    formData.delete('image');
    formData.append('image', optimizedImage[0]);
  }

  const response = await callEndpoint(ENDPOINT_CONFIGS.createProduct, { body: formData });

  revalidatePath(ROUTES.PRODUCTS);
  return response;
};

export const updateProduct = async (id: number | string, formData: FormData) => {
  const image = formData.get('image');

  if (image) {
    const optimizedImage = await optimizeImages([image] as File[]);

    formData.delete('image');
    formData.append('image', optimizedImage[0]);
  }

  const response = await callEndpoint(ENDPOINT_CONFIGS.updateProduct, {
    params: { productId: +id },
    body: formData,
  });

  revalidatePath(ROUTES.PRODUCTS);
  return response;
};

export const deleteProduct = async (id: number | string) => {
  const response = await callEndpoint<DeleteProductRequest, DeleteProductResponse>(
    ENDPOINT_CONFIGS.deleteProduct,
    {
      params: { productId: id.toString() },
    }
  );

  revalidatePath(ROUTES.PRODUCTS);
  return response;
};
