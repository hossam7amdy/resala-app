'use client';

import { DebounceSelect } from '@/components';
import { listProducts } from '@/data/product';
import { Form } from 'antd';

export const SelectProduct: React.FC = () => {
  return (
    <Form.Item required name="productId" label="Product" rules={[{ required: true }]} hasFeedback>
      <DebounceSelect
        autoFocus
        allowClear
        showSearch
        placeholder="Select product"
        filterOption={false}
        optionFilterProp="children"
        fetchOptions={async search => {
          const data = await listProducts({ page: 1, limit: 10, search });
          return data.products.map(p => ({ label: p.enName, value: p.id }));
        }}
      />
    </Form.Item>
  );
};
