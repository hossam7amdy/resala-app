'use client';

import { createCategory, updateCategory } from '@/actions/category';
import { useMutation, useNotification } from '@/hooks';
import type { FormInstance } from 'antd';
import { useRouter } from 'next/navigation';

interface CreateOrUpdateCategoryProps {
  id?: string;
  form: FormInstance;
}

const useCreateOrUpdateCategory = ({ id, form }: CreateOrUpdateCategoryProps) => {
  const router = useRouter();
  const notification = useNotification();
  const { isLoading, mutate } = useMutation({
    mutationFn: id ? updateCategory.bind(null, id) : createCategory,
    onSuccess: () => {
      form.resetFields();
      notification.success('Category submitted successfully');
      if (id) router.back();
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

export { useCreateOrUpdateCategory };
