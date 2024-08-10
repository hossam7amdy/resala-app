'use client';

import debounce from '@/utils/debounce';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface DebounceSelectProps<ValueType>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

const DebounceSelect = <
  ValueType extends { key?: string; label: React.ReactNode; value: string | number },
>({
  fetchOptions,
  debounceTimeout = 500,
  ...props
}: DebounceSelectProps<ValueType>) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useCallback(() => {
    const loadOptions = (value: string) => {
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
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  useEffect(debounceFetcher, [debounceFetcher]); // fetch while init

  return (
    <Select
      showSearch
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
      loading={fetching}
    />
  );
};

export default DebounceSelect;
