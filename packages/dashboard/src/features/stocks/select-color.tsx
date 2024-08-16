import { listAllColors } from '@/data/colors';
import { ColorEditorModal } from '@/features/colors';
import { Flex, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';

import { StockColor } from '.';

export const SelectColor: React.FC = async () => {
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
        <ColorEditorModal>Add Color</ColorEditorModal>
      </FormItem>
    </Flex>
  );
};
