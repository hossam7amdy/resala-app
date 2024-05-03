import { listAllSizes } from '@/data/sizes';
import { Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';

const SelectSize = async () => {
  const sizes = await listAllSizes();

  return (
    <FormItem required name="sizeId" label="Size" rules={[{ required: true }]} hasFeedback>
      <Select
        allowClear
        showSearch
        placeholder="Select Size"
        options={sizes.map(s => ({ label: s.name, value: s.id }))}
      />
    </FormItem>
  );
};

export default SelectSize;
