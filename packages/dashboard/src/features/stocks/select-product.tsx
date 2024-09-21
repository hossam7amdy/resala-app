'use client';

import { DebounceSelect } from '@/components';
import { listProducts } from '@/fetch/products';
import { Form } from 'antd';
import { useCallback } from 'react';

export const SelectProduct: React.FC = () => {
  const listProductsCb = useCallback(async (search: string) => {
    const data = await listProducts({ page: 1, limit: 10, search });
    return data.products.map(p => ({ label: p.enName, value: p.id }));
  }, []);

  return (
    <Form.Item required name="productId" label="Product" rules={[{ required: true }]} hasFeedback>
      <DebounceSelect
        autoFocus
        allowClear
        showSearch
        placeholder="Select product"
        filterOption={false}
        optionFilterProp="children"
        fetchOptions={listProductsCb}
      />
    </Form.Item>
  );
};
