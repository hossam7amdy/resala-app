'use server';

import { optimizeImages } from '@/lib/optimizer';
import { ROUTES } from '@/routes';
import { imageService } from '@/services';
import { revalidateTag } from 'next/cache';

export const listImages = async (productId: string, colorId: string) => {
  return await imageService.list({ productId, colorId });
};

export const uploadImages = async (formData: FormData) => {
  const images = formData.getAll('images') || [];
  formData.delete('images');

  const optimizedImages = await optimizeImages(images as File[]);

  optimizedImages.forEach(optimizedImage => {
    formData.append('images', optimizedImage);
  });

  // TODO: upload to s3, or use signed url
  throw new Error('Not implemented');

  revalidateTag(ROUTES.STOCKS);
  revalidateTag(ROUTES.PRODUCT_STOCKS(formData.get('productId') as string));
};

export const setDefaultImage = async (imageId: string, productId: string) => {
  const response = await imageService.update(imageId, { isPrimary: true });

  revalidateTag(ROUTES.STOCKS);
  revalidateTag(ROUTES.PRODUCT_STOCKS(productId));

  return response;
};

export const deleteImage = async (imageId: string, productId: string) => {
  const response = await imageService.delete(imageId);

  revalidateTag(ROUTES.STOCKS);
  revalidateTag(ROUTES.PRODUCT_STOCKS(productId));

  return response;
};
