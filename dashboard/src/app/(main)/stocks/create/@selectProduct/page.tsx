'use client';

import { DebounceSelect } from '@/components/ui/debounce-select';
import { listProductsPaginated } from '@/data/product';
import FormItem from 'antd/es/form/FormItem';

const SelectProduct = () => {
  return (
    <FormItem required name="productId" label="Product" rules={[{ required: true }]} hasFeedback>
      <DebounceSelect
        autoFocus
        allowClear
        showSearch
        placeholder="Select product"
        filterOption={false}
        optionFilterProp="children"
        fetchOptions={async search => {
          const data = await listProductsPaginated({ page: 1, limit: 10, query: search });
          return data.products.map(p => ({ label: p.enName, value: p.id }));
        }}
      />
    </FormItem>
  );
};

export default SelectProduct;
