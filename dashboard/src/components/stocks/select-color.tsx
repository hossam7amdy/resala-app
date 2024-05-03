import StockColor from '@/components/ui/stock-color';
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
        placeholder="Select color"
        options={colors.map(c => ({
          value: c.id,
          label: (
            <span>
              <StockColor color={c.code} /> {c.enName} | {c.arName}
            </span>
          ),
        }))}
      />
    </FormItem>
  );
};

export default SelectColor;
