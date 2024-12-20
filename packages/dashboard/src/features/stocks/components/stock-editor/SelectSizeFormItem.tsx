import type { Size } from '@resala/shared';
import { Form } from 'antd';
import React from 'react';

import { SelectSize } from './SelectSize';
import type { StockFormValues } from './types';

interface SelectSizeFormItemProps {
  fieldName: number;
  parentFieldName: number;
  sizes: Size[];
}
const SelectSizeFormItem: React.FC<SelectSizeFormItemProps> = ({
  parentFieldName,
  fieldName,
  sizes,
}) => {
  const form = Form.useFormInstance<StockFormValues>();
  const variants = Form.useWatch('variants', form);

  const selectedSizes =
    variants?.[parentFieldName]?.sizes?.reduce((acc, variant) => {
      if (variant?.size) acc.push(variant?.size);
      return acc;
    }, [] as string[]) || [];

  const isSizeSelected = (sizeId: string) => selectedSizes.includes(sizeId);

  return (
    <Form.Item
      required
      rules={[{ required: true }]}
      label={`Size #${fieldName + 1}`}
      name={[fieldName, 'size']}
      style={{ flex: 1 }}
    >
      <SelectSize
        sizes={sizes.map(s => ({
          ...s,
          disabled: isSizeSelected(s.id),
        }))}
      />
    </Form.Item>
  );
};

export { SelectSizeFormItem };
