'use server';

import { SharpImageOptimizer } from '@/lib/ImageOptimizer/SharpImageOptimizer';
import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
import {
  type CreateProductRequest,
  type CreateProductResponse,
  type DeleteProductImageRequest,
  type DeleteProductImageResponse,
  type DeleteProductRequest,
  type DeleteProductResponse,
  ENDPOINT_CONFIGS,
  type UpdateProductRequest,
  type UpdateProductResponse,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addProduct = async (product: CreateProductRequest['body']) => {
  try {
    const response = await callEndpoint<CreateProductRequest, CreateProductResponse>(
      ENDPOINT_CONFIGS.createProduct,
      { body: product }
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

export const updateProduct = async (id: number | string, product: UpdateProductRequest['body']) => {
  try {
    await callEndpoint<UpdateProductRequest, UpdateProductResponse>(
      ENDPOINT_CONFIGS.updateProduct,
      { params: { productId: Number(id) }, body: product }
    );
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

const optimizeImages = async (images: File[]) => {
  const imageOptimizer = new SharpImageOptimizer();

  const optimizedImages: File[] = [];

  for (const image of images) {
    const imageFile = image as File;
    const mimeType = imageFile.type;

    if (!imageOptimizer.supported(mimeType)) {
      throw new Error('Unsupported image type');
    }

    const buffer = await imageFile.arrayBuffer();
    const optimizedImage = await imageOptimizer.optimize(buffer as Buffer);

    const file = new File([optimizedImage], 'optimized.webp', { type: 'image/webp' });
    optimizedImages.push(file);
  }

  return optimizedImages;
};

export const uploadProductImages = async (formData: FormData) => {
  try {
    const images = formData.getAll('images') || [];
    const optimizedImages = await optimizeImages(images as File[]);
    formData.delete('images');

    optimizedImages.forEach(optimizedImage => {
      formData.append('images', optimizedImage);
    });

    const response = await callEndpoint(ENDPOINT_CONFIGS.addProductImages, { body: formData });

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

export const deleteProductImage = async (productId: string, imageId: string) => {
  try {
    const response = await callEndpoint<DeleteProductImageRequest, DeleteProductImageResponse>(
      ENDPOINT_CONFIGS.deleteProductImage,
      { params: { productId: Number(productId), imageId: Number(imageId) } }
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
