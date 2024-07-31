import { useCallback, useEffect, useState } from 'react';

// Input of the hook
type QueryOptions<Data, Variables> = {
  queryFn: (variables: Variables) => Promise<Data>;
  variables: Variables;
  enabled?: boolean; // Whether to run the query immediately
};

// Output of the hook
type QueryResult<Data> = {
  data: Data | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  refetch: () => void;
};

// Actual Hook Implementation
export const useQuery = <Data, Variables>({
  queryFn,
  variables,
  enabled = true,
}: QueryOptions<Data, Variables>): QueryResult<Data> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setData(null);
    setError(null);

    try {
      const response = await queryFn(variables);
      setData(response);
      setIsSuccess(true);
    } catch (error) {
      setError(error as Error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [queryFn, variables]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [fetchData, enabled]);

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch: fetchData,
  };
};
