'use server';

import { ROUTES } from '@/routes';
import { imageService } from '@/services';
import { type CreateImageRequest, CreateImageSchema } from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const listImages = async (productId: string, colorId: string) => {
  return await imageService.list({ productId, colorId });
};

export const addImage = async (image: CreateImageRequest['body']) => {
  image = await CreateImageSchema.shape.body.parseAsync(image);

  await imageService.createMany(image);

  revalidateTag(ROUTES.STOCKS);
  revalidateTag(ROUTES.PRODUCT_STOCKS(image.productId));
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
