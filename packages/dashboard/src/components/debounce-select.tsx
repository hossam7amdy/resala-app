'use client';

import { useDebounce } from '@/hooks';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

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

  const debounceFetcher = useDebounce((value: string) => {
    fetchRef.current += 1;
    const fetchId = fetchRef.current;
    setOptions([]);
    setFetching(true);

    fetchOptions(value).then(newOptions => {
      if (fetchId !== fetchRef.current) {
        // for fetch callback order
        return;
      }

      setOptions(newOptions);
      setFetching(false);
    });
  }, debounceTimeout);

  useEffect(debounceFetcher, []); // fetch on mount

  return (
    <Select
      showSearch
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      loading={fetching}
      {...props}
    />
  );
};
