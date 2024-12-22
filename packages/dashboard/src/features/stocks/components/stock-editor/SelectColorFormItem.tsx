import type { Color } from '@resala/shared';
import { Form } from 'antd';
import React from 'react';

import { SelectColor } from './SelectColor';
import type { StockFormValues } from './types';

interface SelectColorFormItemProps {
  fieldName: number;
  colors: Color[];
}
const SelectColorFormItem: React.FC<SelectColorFormItemProps> = ({ fieldName, colors }) => {
  const form = Form.useFormInstance<StockFormValues>();
  const variants = Form.useWatch('variants', form);

  const selectedColors =
    variants?.reduce((acc, variant) => {
      if (variant?.color) acc.push(variant.color);
      return acc;
    }, [] as string[]) || [];

  const isColorSelected = (colorId: string) => selectedColors.includes(colorId);

  return (
    <Form.Item
      required
      rules={[{ required: true }]}
      label={`Color #${fieldName + 1}`}
      name={[fieldName, 'color']}
      style={{ flex: 1 }}
    >
      <SelectColor
        colors={colors.map(c => ({
          ...c,
          disabled: isColorSelected(c.id),
        }))}
      />
    </Form.Item>
  );
};

export { SelectColorFormItem };
