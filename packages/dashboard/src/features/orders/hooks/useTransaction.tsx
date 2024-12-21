'use client';

import { findPaymentById } from '@/actions/payments';
import { useQuery } from '@/hooks';
import { useCallback } from 'react';

export const useTransaction = (transactionId: string | null) => {
  const findPaymentByIdCb = useCallback(() => findPaymentById(transactionId!), [transactionId]);

  const { isLoading, error, data, refetch } = useQuery({
    queryFn: findPaymentByIdCb,
    enabled: !!transactionId,
  });

  return {
    isLoading,
    error,
    data,
    refetch,
  };
};
