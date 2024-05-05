import { listAllSizes } from '@/data/sizes';
import { Button, Flex, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Link from 'next/link';

const SelectSize = async () => {
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
        <Link href="">
          <Button style={{ padding: '0 20px' }}>Add Size</Button>
        </Link>
      </FormItem>
    </Flex>
  );
};

export default SelectSize;
