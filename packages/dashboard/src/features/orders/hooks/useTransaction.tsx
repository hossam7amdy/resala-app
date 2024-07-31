'use client';

import { findPaymentById } from '@/data/payment';
import { useQuery } from '@/hooks';

export const useTransaction = (transactionId: number | null) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryFn: findPaymentById,
    enabled: !!transactionId,
    variables: transactionId!,
  });

  return {
    isLoading,
    error,
    data,
    refetch,
  };
};
