'use client';

import { findPaymentById } from '@/fetch/payments';
import { useQuery } from '@/hooks';

export const useTransaction = (transactionId: string | null) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryFn: () => findPaymentById(transactionId!),
    enabled: !!transactionId,
  });

  return {
    isLoading,
    error,
    data,
    refetch,
  };
};
