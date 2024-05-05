import StockColor from '@/components/ui/stock-color';
import { listAllColors } from '@/data/colors';
import { Flex, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';

import CreateColorModal from './create-color-modal';

const SelectColor = async () => {
  const colors = await listAllColors();

  return (
    <Flex gap={10}>
      <FormItem
        required
        name="colorId"
        label="Color"
        rules={[{ required: true }]}
        hasFeedback
        style={{ flex: 1 }}
      >
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
      <FormItem label=" ">
        <CreateColorModal />
      </FormItem>
    </Flex>
  );
};

export default SelectColor;
