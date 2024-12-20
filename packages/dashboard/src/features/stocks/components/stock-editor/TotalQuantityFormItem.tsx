import { Form, InputNumber } from 'antd';
import React from 'react';

interface TotalQuantityFormItemProps {
  fieldName: number;
}
const TotalQuantityFormItem: React.FC<TotalQuantityFormItemProps> = ({ fieldName }) => {
  return (
    <Form.Item label="Total quantity" shouldUpdate className="w-32">
      {({ getFieldValue }) => {
        const path = ['variants', fieldName, 'sizes'];
        const sizes = getFieldValue(path)?.filter(Boolean) || [];

        const totalQuantity = sizes.reduce(
          (acc: number, size: { quantity: number }) => acc + size.quantity,
          0
        );

        return <InputNumber disabled value={totalQuantity || 0} className="w-full" />;
      }}
    </Form.Item>
  );
};

export { TotalQuantityFormItem };
