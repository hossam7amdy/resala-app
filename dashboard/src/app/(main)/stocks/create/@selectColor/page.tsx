import { listAllColors } from '@/data/colors';
import { Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';

const SelectColor = async () => {
  const colors = await listAllColors();

  return (
    <FormItem required name="colorId" label="Color" rules={[{ required: true }]} hasFeedback>
      <Select
        allowClear
        showSearch
        placeholder="Select product"
        options={colors.map(c => ({ label: `${c.enName} | ${c.arName}`, value: c.id }))}
      />
    </FormItem>
  );
};

export default SelectColor;
