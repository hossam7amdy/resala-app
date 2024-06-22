import StockColor from '@/component/stock-color';
import { listAllColors } from '@/data/colors';
import ROUTES from '@/lib/routes';
import { Button, Flex, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Link from 'next/link';

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
        <Link href={ROUTES.CREATE_COLOR}>
          <Button>Add Color</Button>
        </Link>
      </FormItem>
    </Flex>
  );
};

export default SelectColor;
