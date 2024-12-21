'use client';

import { updateStocksQuantity } from '@/actions/stocks';
import { useMutation, useNotification } from '@/hooks';

interface UpdateStocksQuantityParams<T = unknown> {
  onSuccess?: () => void;
  onError?: (error: T) => void;
}
const useUpdateStocksQuantity = ({ onSuccess, onError }: UpdateStocksQuantityParams) => {
  const notify = useNotification();

  const { mutate: updateStocks, isLoading } = useMutation({
    mutationFn: updateStocksQuantity,
    onSuccess: () => {
      onSuccess?.();
      notify.success('Stocks quantity updated successfully');
    },
    onError: error => {
      onError?.(error);
      notify.error(error?.message || 'Failed to update stocks quantity');
    },
  });

  return { updateStocks, isLoading };
};

export { useUpdateStocksQuantity };
