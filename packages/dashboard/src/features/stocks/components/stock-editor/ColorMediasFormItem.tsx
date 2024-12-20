import { MediaSelect, type RequiredMedia } from '@/features/media';
import { Form } from 'antd';
import React from 'react';

import { MAX_MEDIA_COUNT } from './constant';
import type { StockFormValues } from './types';

interface ColorMediasFormItemProps {
  fieldName: number;
  medias: RequiredMedia[];
  initialSelection?: RequiredMedia[];
}
const ColorMediasFormItem: React.FC<ColorMediasFormItemProps> = ({
  medias,
  fieldName,
  initialSelection,
}) => {
  const form = Form.useFormInstance<StockFormValues>();

  return (
    <Form.Item
      required
      rules={[
        {
          required: true,
          message: 'At least one image is required',
        },
      ]}
      label="Stock Item medias"
      name={[fieldName, 'medias']}
    >
      <MediaSelect
        multiple
        maxCount={MAX_MEDIA_COUNT}
        medias={medias}
        initialSelection={initialSelection}
        onConfirmSelect={medias => {
          form.setFieldValue(
            ['variants', fieldName, 'medias'],
            medias.map(m => ({ id: m.id, url: m.url }))
          );
        }}
      />
    </Form.Item>
  );
};

export { ColorMediasFormItem };
