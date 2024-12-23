'use client';

import { updateProduct } from '@/actions/products';
import { useMutation, useNotification } from '@/hooks';
import type { Product } from '@resala/shared';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import type { StockFormValues } from '../components';

const useUpdateProductStocks = () => {
  const router = useRouter();
  const notification = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: async ({ product, variants }: StockFormValues & { product: Product }) => {
      const images = variants.flatMap(({ color, medias }) =>
        medias.map((media, index) => ({
          mediaId: media.id,
          imageUrl: media.url,
          colorId: color,
          isPrimary: index === 0,
        }))
      );
      const stocks = variants.flatMap(({ color, sizes }) =>
        sizes.map(({ size, quantity }) => ({ colorId: color, sizeId: size, quantity }))
      );

      return updateProduct(product.id, { images, stocks, ...product });
    },
    onSuccess: () => {
      notification.success(`Stocks updated successfully`);
      router.back();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  const updateProductStock = useCallback(
    (product: Product, values: StockFormValues) => mutate({ product, ...values }),
    [mutate]
  );

  return { updateProductStock, isLoading };
};

export { useUpdateProductStocks };
