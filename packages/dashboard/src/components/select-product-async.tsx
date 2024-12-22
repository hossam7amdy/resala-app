'use client';

import { listProducts } from '@/actions/products';
import { DebounceSelect } from '@/components';
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
