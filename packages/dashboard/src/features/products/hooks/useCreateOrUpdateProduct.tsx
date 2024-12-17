'use client';

import { addProduct, updateProduct } from '@/fetch/products';
import { useMutation, useNotification } from '@/hooks';
import type { CreateProductRequest } from '@resala/shared';
import type { FormInstance } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

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
    mutationFn: handleFinish,
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
