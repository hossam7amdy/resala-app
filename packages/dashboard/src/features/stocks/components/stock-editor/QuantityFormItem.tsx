import { Form, InputNumber } from 'antd';
import React from 'react';

interface QuantityFormItemProps {
  fieldName: number;
}
const QuantityFormItem: React.FC<QuantityFormItemProps> = ({ fieldName }) => {
  return (
    <Form.Item
      required
      rules={[{ required: true, message: 'Required!' }]}
      label="Quantity"
      name={[fieldName, 'quantity']}
      className="w-32"
    >
      <InputNumber placeholder="10" min={0} max={100000} className="w-full" />
    </Form.Item>
  );
};

export { QuantityFormItem };
