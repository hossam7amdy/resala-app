'use server';

import { callEndpoint } from '@/lib/fetch';
import { optimizeImages } from '@/lib/optimizeImages';
import ROUTES from '@/lib/routes';
import type { DeleteProductRequest, DeleteProductResponse } from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addProduct = async (formData: FormData) => {
  try {
    const image = formData.get('image');

    if (image) {
      const optimizedImage = await optimizeImages([image] as File[]);

      formData.delete('image');
      formData.append('image', optimizedImage[0]);
    }

    const response = await callEndpoint(ENDPOINT_CONFIGS.createProduct, { body: formData });

    revalidatePath(ROUTES.PRODUCTS);
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      message: error.message,
      success: false,
    };
  }
};

export const updateProduct = async (id: number | string, formData: FormData) => {
  try {
    const image = formData.get('image');

    if (image) {
      const optimizedImage = await optimizeImages([image] as File[]);

      formData.delete('image');
      formData.append('image', optimizedImage[0]);
    }

    await callEndpoint(ENDPOINT_CONFIGS.updateProduct, {
      params: { productId: +id },
      body: formData,
    });
  } catch (e) {
    const error = e as Error;
    return {
      message: error.message,
      success: false,
    };
  }

  revalidatePath(ROUTES.PRODUCTS);
  redirect(ROUTES.PRODUCTS);
};

export const deleteProduct = async (id: number | string) => {
  try {
    const response = await callEndpoint<DeleteProductRequest, DeleteProductResponse>(
      ENDPOINT_CONFIGS.deleteProduct,
      { params: { productId: Number(id) } }
    );

    revalidatePath(ROUTES.PRODUCTS);
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      message: error.message,
      success: false,
    };
  }
};
