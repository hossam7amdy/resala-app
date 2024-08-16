import { listAllSizes } from '@/data/sizes';
import { Flex, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';

import { SizeEditorModal } from '../sizes';

export const SelectSize: React.FC = async () => {
  const sizes = await listAllSizes();

  return (
    <Flex gap={10}>
      <FormItem
        required
        name="sizeId"
        label="Size"
        rules={[{ required: true }]}
        hasFeedback
        style={{ flex: 1 }}
      >
        <Select
          allowClear
          showSearch
          placeholder="Select Size"
          options={sizes.map(s => ({ label: s.name, value: s.id }))}
        />
      </FormItem>
      <FormItem label=" ">
        <SizeEditorModal>Add Size</SizeEditorModal>
      </FormItem>
    </Flex>
  );
};
