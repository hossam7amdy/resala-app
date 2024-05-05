'use client';

import { createColor, updateColor } from '@/actions/color';
import useSubmitForm from '@/hooks/use-submit-form';
import { type GetColorResponse, validationPatterns } from '@resala/shared';
import { Button, ColorPicker, Flex, Form, Input } from 'antd';
import { ColorFactory } from 'antd/es/color-picker/color';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { useRouter } from 'next/navigation';
import React from 'react';

import ErrorMessage from '../ui/error-message';

interface FormValues {
  enName: string;
  arName: string;
  code: ColorFactory;
}

interface ColorFormProps {
  color?: GetColorResponse['data'];
}
const ColorForm = ({ color }: ColorFormProps) => {
  const isEdit = color?.id !== undefined;
  const submit = isEdit ? updateColor.bind(null, color.id) : createColor;

  const [form] = useForm();
  const router = useRouter();
  const { error, pending, dispatch } = useSubmitForm(submit, form);

  return (
    <Form
      form={form}
      name="color-form"
      size="large"
      layout="vertical"
      initialValues={{
        enName: color?.enName,
        arName: color?.arName,
        code: color?.code ? new ColorFactory(color.code) : undefined,
      }}
      onFinish={async (values: FormValues) => {
        const code = values.code.toHexString();
        return dispatch({ ...values, code });
      }}
    >
      <Flex gap={10}>
        <FormItem
          validateFirst
          style={{ flex: 1 }}
          name="enName"
          label="English Name"
          required
          hasFeedback
          rules={[
            { required: true },
            { ...validationPatterns.validateEnglishCharacters },
            { min: 2, max: 15, message: 'English name must be between 2 and 15 characters' },
          ]}
        >
          <Input placeholder="English name" />
        </FormItem>
        <FormItem
          validateFirst
          style={{ flex: 1, direction: 'rtl' }}
          name="arName"
          label="Arabic Name"
          required
          hasFeedback
          rules={[
            { required: true, message: 'من فضلك ادخل الاسم بالعربي' },
            { ...validationPatterns.validateArabicCharacters },
            { min: 2, max: 15, message: 'الاسم بالعربي يجب ان يكون بين 2 و 15 حرف' },
          ]}
        >
          <Input placeholder="Arabic name" />
        </FormItem>
      </Flex>

      <FormItem
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        name="code"
        label="Color Code"
        required
        hasFeedback
        rules={[{ required: true }]}
      >
        <ColorPicker size="large" showText format="hex" style={{ width: '100%' }} />
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

export default ColorForm;
