'use client';

import { createCategory } from '@/actions/category';
import useSubmitForm from '@/hooks/useSubmitForm';
import { validationPatterns } from '@resala/shared';
import type { Category } from '@resala/shared';
import { Button, Flex, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useRouter } from 'next/navigation';

import ErrorMessage from '../../component/error-message';

const CreateForm = ({ category }: { category?: Category }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const { error, pending, dispatch } = useSubmitForm(createCategory, form);

  return (
    <Form
      form={form}
      size="large"
      name="create-category"
      layout="vertical"
      onFinish={dispatch}
      initialValues={{
        enName: category?.enName,
        arName: category?.arName,
      }}
    >
      <FormItem
        required
        rules={[{ required: true, ...validationPatterns.validateEnglishCharacters }]}
        name="enName"
        label="English Name"
        style={{ flex: 1 }}
      >
        <Input placeholder="Enter English name" autoFocus />
      </FormItem>
      <FormItem
        required
        rules={[{ required: true, ...validationPatterns.validateArabicCharacters }]}
        name="arName"
        label="الأسم بالعربية"
        style={{ direction: 'rtl', flex: 1 }}
      >
        <Input placeholder="أكتب الأسم بالعربية" min={3} max={10} />
      </FormItem>

      {error?.message && <ErrorMessage message={error.message} />}

      <Flex gap={10}>
        <FormItem noStyle>
          <Button type="primary" block htmlType="submit" loading={pending}>
            Create
          </Button>
        </FormItem>
        <FormItem noStyle>
          <Button block disabled={pending} onClick={() => router.back()}>
            Cancel
          </Button>
        </FormItem>
      </Flex>
    </Form>
  );
};

export default CreateForm;
