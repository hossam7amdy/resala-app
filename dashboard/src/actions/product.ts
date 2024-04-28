'use server';

import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
import {
  type CreateProductRequest,
  type CreateProductResponse,
  type DefaultResponseBody,
  type DeleteProductImageResponse,
  type DeleteProductResponse,
  ENDPOINT_CONFIGS,
  type UpdateProductRequest,
  type UpdateProductResponse,
  withParams,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const addProduct = async (
  product: CreateProductRequest['body']
): Promise<CreateProductResponse> => {
  try {
    const response = await callEndpoint<CreateProductRequest, CreateProductResponse>(
      ENDPOINT_CONFIGS.createProduct,
      { body: product }
    );

    revalidatePath(ROUTES.PRODUCTS);
    return response;
  } catch (error) {
    return error as CreateProductResponse;
  }
};

export const updateProduct = async (id: number | string, product: UpdateProductRequest['body']) => {
  try {
    await callEndpoint<Omit<UpdateProductRequest, 'params'>, UpdateProductResponse>(
      withParams(ENDPOINT_CONFIGS.updateProduct, String(id)),
      { body: product }
    );

    revalidatePath(ROUTES.PRODUCTS);
  } catch (error) {
    return error as UpdateProductResponse;
  }
};

export const deleteProduct = async (id: number | string): Promise<DeleteProductResponse> => {
  try {
    const response = await callEndpoint<undefined, DeleteProductResponse>(
      withParams(ENDPOINT_CONFIGS.deleteProduct, String(id))
    );

    revalidatePath(ROUTES.PRODUCTS);
    return response;
  } catch (error) {
    return error as DeleteProductResponse;
  }
};

export const uploadProductImages = async (
  id: string,
  formData: FormData
): Promise<DefaultResponseBody> => {
  try {
    const response = await callEndpoint(withParams(ENDPOINT_CONFIGS.addProductImages, id), {
      body: formData,
    });

    revalidatePath(ROUTES.PRODUCT_DETAILS(id));
    return response;
  } catch (error) {
    return error as DefaultResponseBody;
  }
};

export const deleteProductImage = async (
  productId: string,
  imageId: string
): Promise<DeleteProductImageResponse> => {
  try {
    const response = await callEndpoint<undefined, DeleteProductImageResponse>(
      withParams(ENDPOINT_CONFIGS.deleteProductImage, productId, imageId)
    );

    revalidatePath(ROUTES.PRODUCT_DETAILS(productId));
    return response;
  } catch (error) {
    return error as DeleteProductImageResponse;
  }
};
