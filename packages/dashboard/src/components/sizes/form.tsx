'use client';

import { createSize, updateSize } from '@/actions/size';
import useSubmitForm from '@/hooks/use-submit-form';
import { type GetSizeResponse, validationPatterns } from '@resala/shared';
import { Button, Flex, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { useRouter } from 'next/navigation';

import ErrorMessage from '../ui/error-message';

interface SizeFormProps {
  size?: GetSizeResponse['data'];
}
const SizeForm = ({ size }: SizeFormProps) => {
  const isEdit = size?.id !== undefined;
  const submit = isEdit ? updateSize.bind(null, size.id) : createSize;

  const [form] = useForm();
  const router = useRouter();
  const { error, pending, dispatch } = useSubmitForm(submit, form);

  return (
    <Form
      form={form}
      name="size-form"
      size="large"
      layout="vertical"
      initialValues={size}
      onFinish={dispatch}
    >
      <FormItem
        validateFirst
        name="name"
        label="Size Name"
        required
        hasFeedback
        rules={[
          { required: true },
          { ...validationPatterns.validateEnglishCharacters },
          { min: 1, max: 5, message: 'English name must be between 1 and 5 characters' },
        ]}
      >
        <Input placeholder="XXL" />
      </FormItem>

      {error?.message && <ErrorMessage message={error.message} />}

      <FormItem>
        <Flex gap={10}>
          <Button type="primary" htmlType="submit" block loading={pending}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button type="default" onClick={router.back} block disabled={pending}>
            Cancel
          </Button>
        </Flex>
      </FormItem>
    </Form>
  );
};

export default SizeForm;
