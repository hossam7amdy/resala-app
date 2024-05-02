'use server';

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
import { type UploadFile } from 'antd/es/upload';
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
    return { success: false, message: (e as Error).message || 'Something went wrong' };
  }
};

export const updateProduct = async (id: number | string, product: UpdateProductRequest['body']) => {
  try {
    await callEndpoint<UpdateProductRequest, UpdateProductResponse>(
      ENDPOINT_CONFIGS.updateProduct,
      { params: { productId: Number(id) }, body: product }
    );
  } catch (e) {
    return { success: false, message: (e as Error).message || 'Something went wrong' };
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
    return { success: false, message: (e as Error).message || 'Something went wrong' };
  }
};

export const uploadProductImages = async (payload: { productId: string; images: UploadFile[] }) => {
  try {
    const formData = new FormData();
    formData.append('productId', payload.productId);
    payload.images.forEach(image => {
      formData.append('images', image.originFileObj!);
    });

    const response = await callEndpoint(ENDPOINT_CONFIGS.addProductImages, { body: formData });

    revalidatePath(ROUTES.PRODUCT_IMAGES(payload.productId));
    return response;
  } catch (e) {
    return { success: false, message: (e as Error).message || 'Something went wrong' };
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
    return { success: false, message: (e as Error).message || 'Something went wrong' };
  }
};
