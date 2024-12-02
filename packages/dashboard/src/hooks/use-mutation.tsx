'use client';

import { logout } from '@/fetch/auth';
import { sleep } from '@/utils/sleep';
import { useCallback, useState } from 'react';

type Error = {
  message: string;
  status: number;
  statusText: string;
};

type Result<T = unknown> = {
  data: T | null;
  error?: Error;
};

type MutationOptions<Data, Variables> = {
  mutationFn: (variables: Variables) => Promise<Data>;
  onSuccess?: (data: Data, variables: Variables) => void;
  onError?: (error: Error) => void;
};

type MutationResult<Data, Variables> = {
  mutate: (variables: Variables) => Promise<void>;
  isLoading: boolean;
  data?: Data;
  error?: Error;
  isSuccess: boolean;
  isError: boolean;
};

export const useMutation = <Data, Variables>({
  mutationFn,
  onError = () => {},
  onSuccess = () => {},
}: MutationOptions<Data, Variables>): MutationResult<Data, Variables> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<Error>();

  const mutate = useCallback(
    async (variables: Variables) => {
      setIsLoading(true);
      setData(undefined);
      setError(undefined);

      try {
        const result = (await mutationFn(variables)) as Result<Data>;

        if ((result as Result)?.error) {
          throw result.error;
        }

        if (result?.data) {
          setData(result.data);
          onSuccess(result.data, variables);
        }
      } catch (e) {
        const error = e as Error;

        setError(error);
        onError(error);

        if (error.status && [401, 403].includes(error.status)) {
          await sleep(2000).then(logout);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, onError, onSuccess]
  );

  return {
    mutate,
    isLoading,
    isError: !!error,
    isSuccess: !!data,
    data,
    error,
  };
};
