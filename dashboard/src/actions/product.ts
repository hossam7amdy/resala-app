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
    await callEndpoint<CreateProductRequest, CreateProductResponse>(
      ENDPOINT_CONFIGS.createProduct,
      { body: product }
    );
  } catch (e) {
    return { message: (e as Error).message || 'Something went wrong' };
  }

  revalidatePath(ROUTES.PRODUCTS);
};

export const updateProduct = async (id: number | string, product: UpdateProductRequest['body']) => {
  try {
    await callEndpoint<UpdateProductRequest, UpdateProductResponse>(
      ENDPOINT_CONFIGS.updateProduct,
      { params: { productId: Number(id) }, body: product }
    );
  } catch (e) {
    return { message: (e as Error).message || 'Something went wrong' };
  }

  revalidatePath(ROUTES.PRODUCTS);
  redirect(ROUTES.PRODUCTS);
};

export const deleteProduct = async (id: number | string) => {
  try {
    await callEndpoint<DeleteProductRequest, DeleteProductResponse>(
      ENDPOINT_CONFIGS.deleteProduct,
      { params: { productId: Number(id) } }
    );
  } catch (e) {
    return { message: (e as Error).message || 'Something went wrong' };
  }

  revalidatePath(ROUTES.PRODUCTS);
};

export const uploadProductImages = async (payload: { productId: string; images: UploadFile[] }) => {
  try {
    const formData = new FormData();
    formData.append('productId', payload.productId);
    payload.images.forEach(image => {
      formData.append('images', image.originFileObj!);
    });

    await callEndpoint(ENDPOINT_CONFIGS.addProductImages, { body: formData });
  } catch (e) {
    return { message: (e as Error).message || 'Something went wrong' };
  }

  revalidatePath(ROUTES.PRODUCT_IMAGES(payload.productId));
};

export const deleteProductImage = async (productId: string, imageId: string) => {
  try {
    await callEndpoint<DeleteProductImageRequest, DeleteProductImageResponse>(
      ENDPOINT_CONFIGS.deleteProductImage,
      { params: { productId: Number(productId), imageId: Number(imageId) } }
    );
  } catch (e) {
    return { message: (e as Error).message || 'Something went wrong' };
  }

  revalidatePath(ROUTES.PRODUCT_STOCKS(productId));
};
