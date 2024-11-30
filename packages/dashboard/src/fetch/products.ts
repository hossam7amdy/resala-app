'use server';

import { optimizeImages } from '@/lib/optimizer';
import { ROUTES } from '@/routes';
import { productService } from '@/services';
import type {
  CreateProductResponse,
  DeleteProductResponse,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  UpdateProductResponse,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const listProducts = async (
  query: ListProductsRequest['query']
): Promise<ListProductsResponse['data']> => {
  return await productService.list(query);
};

export const findProduct = async (id: string | number): Promise<GetProductResponse['data']> => {
  try {
    return await productService.get(+id);
  } catch {
    return notFound();
  }
};

export const addProduct = async (formData: FormData): Promise<CreateProductResponse> => {
  try {
    const image = formData.get('image');

    if (image) {
      const optimizedImage = await optimizeImages([image] as File[]);

      formData.delete('image');
      formData.append('image', optimizedImage[0]);
    }

    const data = await productService.create(formData);

    revalidatePath(ROUTES.PRODUCTS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as CreateProductResponse;
  }
};

export const updateProduct = async (
  id: number | string,
  formData: FormData
): Promise<UpdateProductResponse> => {
  try {
    const image = formData.get('image');

    if (image) {
      const optimizedImage = await optimizeImages([image] as File[]);

      formData.delete('image');
      formData.append('image', optimizedImage[0]);
    }

    const data = await productService.update(+id, formData);

    revalidatePath(ROUTES.PRODUCTS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as UpdateProductResponse;
  }
};

export const deleteProduct = async (id: number | string): Promise<DeleteProductResponse> => {
  try {
    const data = await productService.delete(+id);

    revalidatePath(ROUTES.PRODUCTS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as DeleteProductResponse;
  }
};
