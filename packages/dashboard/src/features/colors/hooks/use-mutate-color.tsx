'use client';

import { createColor, updateColor } from '@/fetch/colors';
import { useMutation, useNotification } from '@/hooks';
import { useRouter } from 'next/navigation';

interface MutateColorOptions {
  id?: number | string;
  onSuccess?: () => void;
}
export const useMutateColor = ({ id, onSuccess }: MutateColorOptions) => {
  const router = useRouter();

  const notification = useNotification();

  const submit = id ? updateColor.bind(null, id) : createColor;
  const { isLoading, mutate } = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      notification.success(`Color has been ${id ? 'updated' : 'created'} successfully`);
      router.refresh();
      onSuccess?.();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return {
    isLoading,
    mutate,
  };
};
