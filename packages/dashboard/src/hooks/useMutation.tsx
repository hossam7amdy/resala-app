'use client';

import { useCallback, useState } from 'react';

// Input of the hook
type MutationOptions<Data, Variables, Context = unknown> = {
  mutationFn: (variables: Variables) => Promise<Data>;
  onMutate?: (variables: Variables) => Context;
  onError?: (error: Error) => void;
  onSuccess?: (data: Data, variables: Variables, context: Context) => void;
  onFinally?: () => void;
};

// Output of the hook
type MutationResult<Data, Variables> = {
  mutate: (variables: Variables) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: Data | null;
  error: Error | null;
};

// Actual Hook Implementation
export const useMutation = <Data, Variables, Context = unknown>({
  mutationFn,
  onMutate = () => ({}) as Context,
  onError = () => {},
  onSuccess = () => {},
  onFinally = () => {},
}: MutationOptions<Data, Variables, Context>): MutationResult<Data, Variables> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Callback used here to avoid unnecessary re-renders,
  // when passing the mutate function to child components
  const mutate = useCallback(
    async (variables: Variables) => {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);
      setData(null);
      setError(null);

      let context: Context;
      try {
        // Return the context to be used in onSuccess
        context = onMutate(variables);
        const result = await mutationFn(variables);

        setData(result);
        setIsSuccess(true);
        onSuccess(result, variables, context);
      } catch (error) {
        setError(error as Error);
        setIsError(true);
        onError(error as Error);
      } finally {
        setIsLoading(false);
        onFinally();
      }
    },
    [onMutate, mutationFn, onSuccess, onError, onFinally]
  );

  return {
    mutate,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
  };
};
