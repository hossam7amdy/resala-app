'use server';

import { callEndpoint } from '@/lib/fetch';
import { optimizeImages } from '@/lib/optimizeImages';
import ROUTES from '@/lib/routes';
import {
  type DeleteImageRequest,
  type DeleteImageResponse,
  ENDPOINT_CONFIGS,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';

const revalidateCache = (productId: string) => {
  revalidatePath(ROUTES.STOCKS);
  revalidatePath(ROUTES.PRODUCT_STOCKS(productId));
};

export const uploadImages = async (formData: FormData) => {
  try {
    const images = formData.getAll('images') || [];
    formData.delete('images');

    const optimizedImages = await optimizeImages(images as File[]);

    optimizedImages.forEach(optimizedImage => {
      formData.append('images', optimizedImage);
    });

    const response = await callEndpoint(ENDPOINT_CONFIGS.addImages, { body: formData });

    revalidateCache(formData.get('productId') as string);

    return response;
  } catch (e) {
    const error = e as Error;
    return {
      message: error.message,
      success: false,
    };
  }
};

export const setDefaultImage = async (imageId: string, productId: string) => {
  try {
    const response = await callEndpoint(ENDPOINT_CONFIGS.updateImage, {
      params: { imageId: Number(imageId) },
    });

    revalidateCache(productId);

    return response;
  } catch (e) {
    const error = e as Error;
    return {
      message: error.message,
      success: false,
    };
  }
};

export const deleteImage = async (imageId: string, productId: string) => {
  try {
    const response = await callEndpoint<DeleteImageRequest, DeleteImageResponse>(
      ENDPOINT_CONFIGS.deleteImage,
      { params: { imageId: Number(imageId) } }
    );

    revalidateCache(productId);

    return response;
  } catch (e) {
    const error = e as Error;
    return {
      message: error.message,
      success: false,
    };
  }
};
