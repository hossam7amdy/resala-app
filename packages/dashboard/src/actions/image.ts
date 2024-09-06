'use server';

import { callEndpoint } from '@/fetch';
import { optimizeImages } from '@/lib/optimize-images';
import { ROUTES } from '@/utils/routes';
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
  const images = formData.getAll('images') || [];
  formData.delete('images');

  const optimizedImages = await optimizeImages(images as File[]);

  optimizedImages.forEach(optimizedImage => {
    formData.append('images', optimizedImage);
  });

  const response = await callEndpoint(ENDPOINT_CONFIGS.addImages, { body: formData });

  revalidateCache(formData.get('productId') as string);

  return response;
};

export const setDefaultImage = async (imageId: string, productId: string) => {
  const response = await callEndpoint(ENDPOINT_CONFIGS.updateImage, {
    params: { imageId: Number(imageId) },
  });

  revalidateCache(productId);

  return response;
};

export const deleteImage = async (imageId: string, productId: string) => {
  const response = await callEndpoint<DeleteImageRequest, DeleteImageResponse>(
    ENDPOINT_CONFIGS.deleteImage,
    { params: { imageId: imageId.toString() } }
  );

  revalidateCache(productId);

  return response;
};
