'use client';

import { logout } from '@/actions/auth';
import { useCallback, useState } from 'react';

type Success<T> = ({ statusCode: number; success: boolean } & T) | void;
type Error = { statusCode: number; success: boolean; message: string };

type MutationOptions<Data, Variables> = {
  mutationFn: (variables: Variables) => Promise<Success<Data>>;
  onSuccess?: (data: Success<Data>, variables: Variables) => void;
  onError?: (error: Error) => void;
};

type MutationResult<Data, Variables> = {
  mutate: (variables: Variables) => Promise<void>;
  isLoading: boolean;
  data?: Success<Data>;
  error?: Error;
};

export const useMutation = <Data, Variables>({
  mutationFn,
  onError = () => {},
  onSuccess = () => {},
}: MutationOptions<Data, Variables>): MutationResult<Data, Variables> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Success<Data>>();
  const [error, setError] = useState<Error>();

  const mutate = useCallback(
    async (variables: Variables) => {
      setIsLoading(true);
      setData(undefined);
      setError(undefined);

      try {
        const result = await mutationFn(variables);

        if (result instanceof Object && !result.success) {
          throw result;
        }

        const successResult = (result ?? {}) as Success<Data>;

        setData(successResult);
        onSuccess(successResult, variables);
      } catch (e) {
        const error = e as Error;

        if (error.statusCode === 401) {
          logout();
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
