import { useCallback, useEffect, useState } from 'react';

type QueryOptions<Data> = {
  queryFn: (...variables: unknown[]) => Promise<Data>;
  enabled?: boolean;
};

type QueryResult<Data> = {
  data?: Data;
  error?: Error;
  isLoading: boolean;
  refetch: () => void;
};

export const useQuery = <Data,>({
  queryFn,
  enabled = true,
}: QueryOptions<Data>): QueryResult<Data> => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await queryFn();
      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [fetchData, enabled]);

  return {
    data,
    error,
    isLoading,
    refetch: fetchData,
  };
};
