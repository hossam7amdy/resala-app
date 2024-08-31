'use client';

import { findPaymentById } from '@/data/payment';
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
