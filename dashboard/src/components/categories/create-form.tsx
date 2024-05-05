'use client';

import { createCategory } from '@/actions/category';
import useSubmitForm from '@/hooks/use-submit-form';
import { type GetCategoriesListResponse, validationPatterns } from '@resala/shared';
import { Button, Flex, Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useRouter } from 'next/navigation';

import ErrorMessage from '../ui/error-message';

const CreateForm = ({ categories }: { categories: GetCategoriesListResponse['data'] }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { error, pending, dispatch } = useSubmitForm(createCategory, form);

  return (
    <Form form={form} size="large" name="create-category" layout="vertical" onFinish={dispatch}>
      <FormItem name="categoryId" label="Main Category">
        <Select
          allowClear
          placeholder="Select main category"
          options={categories.map(category => ({
            label: `${category.enName} - ${category.arName}`,
            value: category.id,
          }))}
          showSearch
          filterOption={(input, option) =>
            !option?.label.toLowerCase().indexOf(input.toLowerCase())
          }
        />
      </FormItem>

      <Flex gap={10}>
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
      </Flex>

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
