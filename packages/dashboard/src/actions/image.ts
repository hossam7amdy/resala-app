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

export const uploadProductImages = async (formData: FormData) => {
  try {
    const images = formData.getAll('images') || [];
    const optimizedImages = await optimizeImages(images as File[]);
    formData.delete('images');

    optimizedImages.forEach(optimizedImage => {
      formData.append('images', optimizedImage);
    });

    const response = await callEndpoint(ENDPOINT_CONFIGS.addImages, { body: formData });

    revalidatePath(ROUTES.PRODUCT_IMAGES(formData.get('productId') as string));
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      message: error.message,
      success: false,
    };
  }
};

export const setDefaultImage = async (imageId: string) => {
  try {
    const response = await callEndpoint(ENDPOINT_CONFIGS.updateImage, {
      params: { imageId: Number(imageId) },
    });

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

export const deleteProductImage = async (productId: string, imageId: string) => {
  try {
    const response = await callEndpoint<DeleteImageRequest, DeleteImageResponse>(
      ENDPOINT_CONFIGS.deleteImage,
      { params: { imageId: Number(imageId) } }
    );

    revalidatePath(ROUTES.PRODUCT_STOCKS(productId));
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      message: error.message,
      success: false,
    };
  }
};
