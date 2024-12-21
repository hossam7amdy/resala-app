'use client';

import { addProduct, updateProduct } from '@/actions/products';
import { useMutation, useNotification } from '@/hooks';
import type { CreateProductRequest } from '@resala/shared';
import type { FormInstance } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import type { ProductFormValues } from '../types';

const useCreateOrUpdateProduct = ({
  form,
  productId,
  isEdit = false,
}: {
  isEdit?: boolean;
  form: FormInstance;
  productId?: string;
}) => {
  const router = useRouter();
  const notification = useNotification();

  const submit = isEdit ? updateProduct.bind(null, productId!) : addProduct;
  const handleFinish = useCallback(
    (values: CreateProductRequest['body']) => submit(values),
    [submit]
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: async ({ variants, ...product }: ProductFormValues) => {
      const images = variants.flatMap(({ color, medias }) =>
        medias.map((media, index) => ({
          imageKey: media.id,
          imageUrl: media.url,
          colorId: color,
          isPrimary: index === 0,
        }))
      );
      const stocks = variants.flatMap(({ color, sizes }) =>
        sizes.map(({ size, quantity }) => ({ colorId: color, sizeId: size, quantity }))
      );

      return handleFinish({
        ...product,
        imageKey: product.image.id,
        imageUrl: product.image.url,
        images,
        stocks,
      });
    },
    onSuccess: () => {
      if (!isEdit) form.resetFields();
      notification.success(`Product ${isEdit ? 'updated' : 'added'} successfully`);
      if (isEdit) router.back();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return {
    isLoading,
    handleSubmit: mutate,
  };
};

export { useCreateOrUpdateProduct };
