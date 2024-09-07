'use client';

import { logout } from '@/actions/auth';
import type { APIError } from '@/fetch';
import { useCallback, useState } from 'react';

type MutationOptions<Data, Variables> = {
  mutationFn: (variables: Variables) => Promise<Data>;
  onError?: (error: APIError) => void;
  onSuccess?: (data: Data, variables: Variables) => void;
};

type MutationResult<Data, Variables> = {
  mutate: (variables: Variables) => Promise<void>;
  isLoading: boolean;
  data?: Data | null;
  error?: APIError | null;
};

export const useMutation = <Data, Variables>({
  mutationFn,
  onError = () => {},
  onSuccess = () => {},
}: MutationOptions<Data, Variables>): MutationResult<Data, Variables> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<APIError | null>(null);

  const mutate = useCallback(
    async (variables: Variables) => {
      setIsLoading(true);
      setData(null);
      setError(null);

      try {
        const result = await mutationFn(variables);

        console.log('result', result);

        setData(result);
        onSuccess(result, variables);
      } catch (e) {
        const error = e as APIError;

        if (error.status === 401) {
          await logout();
        }

        setError(error);
        onError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, onSuccess, onError]
  );

  return {
    mutate,
    isLoading,
    data,
    error,
  };
};
