'use client';

import { useCallback, useState } from 'react';

type MutationOptions<Data, Variables> = {
  mutationFn: (variables: Variables) => Promise<Data>;
  onError?: (error: Error) => void;
  onSuccess?: (data: Data, variables: Variables) => void;
};

type MutationResult<Data, Variables> = {
  mutate: (variables: Variables) => Promise<void>;
  isLoading: boolean;
  data?: Data | null;
  error?: Error | null;
};

export const useMutation = <Data, Variables>({
  mutationFn,
  onError = () => {},
  onSuccess = () => {},
}: MutationOptions<Data, Variables>): MutationResult<Data, Variables> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: Variables) => {
      setIsLoading(true);
      setData(null);
      setError(null);

      try {
        const result = await mutationFn(variables);

        // @ts-expect-error - This is a valid check
        if (result?.success === true) {
          setData(result);
          onSuccess(result, variables);
          // @ts-expect-error - This is a valid check
        } else if (result?.success === false) {
          // @ts-expect-error - This is a valid check
          const errorObj = new Error(result?.message || 'An error occurred');

          setError(errorObj);
          onError(errorObj);
        }
      } catch (e) {
        setError(e as Error);
        onError(e as Error);
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
