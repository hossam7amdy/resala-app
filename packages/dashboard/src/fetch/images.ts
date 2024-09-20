'use server';

import { callEndpoint } from '@/fetch';
import { optimizeImages } from '@/lib/optimize-images';
import { ROUTES } from '@/routes';
import type {
  CreateImageResponse,
  DeleteImageRequest,
  DeleteImageResponse,
  ListImagesRequest,
  ListImagesResponse,
  UpdateImageRequest,
  UpdateImageResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const listImages = async (productId: number, colorId: number) => {
  const response = await callEndpoint<ListImagesRequest, ListImagesResponse>(
    ENDPOINT_CONFIGS.findImages,
    { query: { productId, colorId }, next: { tags: [ROUTES.PRODUCT_STOCKS(productId)] } }
  );

  return response.data;
};

export const uploadImages = async (formData: FormData) => {
  const images = formData.getAll('images') || [];
  formData.delete('images');

  const optimizedImages = await optimizeImages(images as File[]);

  optimizedImages.forEach(optimizedImage => {
    formData.append('images', optimizedImage);
  });

  const response = await callEndpoint<{ body: FormData }, CreateImageResponse>(
    ENDPOINT_CONFIGS.addImages,
    { body: formData }
  );

  revalidateTag(ROUTES.STOCKS);
  revalidateTag(ROUTES.PRODUCT_STOCKS(formData.get('productId') as string));

  return response;
};

export const setDefaultImage = async (imageId: string, productId: string) => {
  const response = await callEndpoint<UpdateImageRequest, UpdateImageResponse>(
    ENDPOINT_CONFIGS.updateImage,
    { params: { imageId }, body: { isPrimary: true } }
  );

  revalidateTag(ROUTES.STOCKS);
  revalidateTag(ROUTES.PRODUCT_STOCKS(productId));

  return response;
};

export const deleteImage = async (imageId: string, productId: string) => {
  const response = await callEndpoint<DeleteImageRequest, DeleteImageResponse>(
    ENDPOINT_CONFIGS.deleteImage,
    { params: { imageId: imageId.toString() } }
  );

  revalidateTag(ROUTES.STOCKS);
  revalidateTag(ROUTES.PRODUCT_STOCKS(productId));

  return response;
};
