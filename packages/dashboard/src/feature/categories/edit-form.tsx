'use client';

import { updateCategory } from '@/actions/category';
import useSubmitForm from '@/hooks/useSubmitForm';
import { type GetCategoryResponse, validationPatterns } from '@resala/shared';
import { Button, Flex, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useRouter } from 'next/navigation';
import React from 'react';

import ErrorMessage from '../../component/error-message';

const EditForm: React.FC<{ category: GetCategoryResponse['data'] }> = ({ category }) => {
  const router = useRouter();
  const update = updateCategory.bind(null, String(category.id));
  const { error, pending, dispatch } = useSubmitForm(update);

  return (
    <Form
      size="large"
      name="create-category"
      layout="vertical"
      onFinish={dispatch}
      initialValues={{
        enName: category.enName,
        arName: category.arName,
      }}
    >
      <Flex gap={10}>
        <FormItem
          required
          rules={[{ required: true }]}
          name="enName"
          label="English Name"
          style={{ flex: 1 }}
        >
          <Input placeholder="Enter English name" autoFocus />
        </FormItem>
        <FormItem
          required
          rules={[
            {
              required: true,
              ...validationPatterns.validateArabicCharacters,
            },
          ]}
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
            Update
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

export default EditForm;
