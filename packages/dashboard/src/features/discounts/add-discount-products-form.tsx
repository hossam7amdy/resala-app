import { SelectProductAsync } from '@/components/select-product-async';
import { addProductsToDiscount } from '@/fetch/discount';
import { useMutation, useNotification } from '@/hooks';
import { Button, Flex, Form } from 'antd';
import React from 'react';

interface AddDiscountProductsFormProps {
  discountId: string;
  onCanceled?: () => void;
  onFinished?: () => void;
}
export const AddDiscountProductsForm: React.FC<AddDiscountProductsFormProps> = ({
  discountId,
  onCanceled,
  onFinished,
}) => {
  const [form] = Form.useForm();
  const { error, success } = useNotification();

  const { mutate, isLoading } = useMutation({
    mutationFn: addProductsToDiscount.bind(null, discountId),
    onSuccess: () => {
      success('Products have been added to the discount successfully');
      form.resetFields();
      onFinished?.();
    },
    onError: e => {
      error(e.message);
      onCanceled?.();
    },
  });

  return (
    <Form
      size="large"
      name="discount-product-editor"
      layout="vertical"
      form={form}
      onFinish={mutate}
    >
      <Form.Item name="productIds" label="Select Products" rules={[{ required: true }]}>
        <SelectProductAsync autoFocus mode="multiple" />
      </Form.Item>

      <Form.Item>
        <Flex gap={10}>
          <Button disabled={isLoading} size="large" block onClick={onCanceled}>
            Cancel
          </Button>

          <Button loading={isLoading} size="large" block type="primary" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
