'use client';

import { DebounceSelect } from '@/components';
import { listProducts } from '@/fetch/products';
import type { SelectProps } from 'antd';
import { useCallback } from 'react';

export const SelectProductAsync: React.FC<SelectProps> = props => {
  const listProductsCb = useCallback(async (search: string) => {
    const data = await listProducts({ page: 1, limit: 10, search });
    return data.products.map(p => ({ label: `${p.enName} | ${p.arName}`, value: p.id }));
  }, []);

  return (
    <DebounceSelect
      showSearch
      placeholder="Select product"
      filterOption={false}
      optionFilterProp="children"
      fetchOptions={listProductsCb}
      {...props}
    />
  );
};
