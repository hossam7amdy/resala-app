'use client';

import { useDebounce } from '@/hooks';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface DebounceSelectProps<ValueType>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

export const DebounceSelect = <
  ValueType extends { key?: string; label: React.ReactNode; value: string | number },
>({
  fetchOptions,
  debounceTimeout = 350,
  ...props
}: DebounceSelectProps<ValueType>) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const fetcherCallback = useCallback(
    async (value: unknown) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      const newOptions = await fetchOptions(value as string);
      if (fetchId !== fetchRef.current) {
        // for fetch callback order
        return;
      }

      setOptions(newOptions);
      setFetching(false);
    },
    [fetchOptions]
  );

  const debounceFetcher = useDebounce(fetcherCallback, debounceTimeout);

  useEffect(debounceFetcher, [debounceFetcher]);

  return (
    <Select
      showSearch
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : undefined}
      options={options}
      loading={fetching}
      {...props}
    />
  );
};
