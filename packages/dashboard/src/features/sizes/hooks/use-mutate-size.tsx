'use client';

import { createSize, updateSize } from '@/actions/sizes';
import { useMutation, useNotification } from '@/hooks';
import { useRouter } from 'next/navigation';

interface MutateSizeOptions {
  id?: string;
  onSuccess?: () => void;
}
export const useMutateSize = ({ id, onSuccess }: MutateSizeOptions) => {
  const router = useRouter();

  const notification = useNotification();

  const isEdit = id !== undefined;
  const submit = isEdit ? updateSize.bind(null, id) : createSize;
  const { isLoading, mutate } = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      notification.success(`Size ${isEdit ? 'updated' : 'created'} successfully`);
      router.refresh();
      onSuccess?.();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return { mutate, isLoading };
};
