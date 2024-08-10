'use client';

import { useCreateColor } from '@/features/colors';
import { validationPatterns } from '@resala/shared';
import type { Color } from '@resala/shared';
import { Button, ColorPicker, Flex, Form, Input } from 'antd';
import { ColorFactory } from 'antd/es/color-picker/color';
import { useForm } from 'antd/es/form/Form';
import React from 'react';

interface FormValues {
  enName: string;
  arName: string;
  code: ColorFactory;
}

interface ColorFormProps {
  onCancel?: () => void;
  color?: Color;
}
export const ColorEditor = ({ color, onCancel }: ColorFormProps) => {
  const [form] = useForm();

  const { isLoading, mutate } = useCreateColor({ id: color?.id, onSuccess: onCancel });

  const isEdit = !!color;

  return (
    <Form
      form={form}
      name={`color-form-${color?.id}`}
      size="large"
      layout="vertical"
      initialValues={{
        enName: color?.enName,
        arName: color?.arName,
        code: color?.code ? new ColorFactory(color.code) : undefined,
      }}
      onFinish={async (values: FormValues) => {
        const code = values.code.toHexString();
        return mutate({ ...values, code });
      }}
    >
      <Flex gap={10}>
        <Form.Item
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
          <Input placeholder="Blue" />
        </Form.Item>
        <Form.Item
          validateFirst
          style={{ flex: 1, direction: 'rtl' }}
          name="arName"
          label="الاسم بالعربي"
          required
          hasFeedback
          rules={[
            { required: true, message: 'من فضلك ادخل الاسم بالعربي' },
            { ...validationPatterns.validateArabicCharacters },
            { min: 2, max: 15, message: 'الاسم بالعربي يجب ان يكون بين 2 و 15 حرف' },
          ]}
        >
          <Input placeholder="أزرق" />
        </Form.Item>
      </Flex>

      <Form.Item
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        name="code"
        label="Color Code"
        required
        hasFeedback
        rules={[{ required: true }]}
      >
        <ColorPicker size="large" showText format="hex" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Flex gap={10}>
          <Button htmlType="reset" block disabled={isLoading} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
