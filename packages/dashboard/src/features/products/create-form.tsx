'use client';

import { addProduct, updateProduct } from '@/actions/product';
import useSubmitForm from '@/hooks/useSubmitForm';
import { InboxOutlined } from '@ant-design/icons';
import { type Category, type Product, validationPatterns } from '@resala/shared';
import {
  Form as AntForm,
  Button,
  Flex,
  Input,
  InputNumber,
  Select,
  Upload,
  type UploadFile,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import Text from 'antd/es/typography/Text';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type FormValues = {
  categoryId: string;
  enName: string;
  arName: string;
  enDescription: string;
  arDescription: string;
  price: number;
  image: UploadFile[];
};

const Form: React.FC<{ product?: Product; categories: Category[] }> = ({ product, categories }) => {
  const router = useRouter();
  const [form] = useForm();

  const isEdit = !!product;
  const submit = isEdit ? updateProduct.bind(null, product.id) : addProduct;

  const handleFinish = useCallback(
    (values: FormValues) => {
      const { image, ...rest } = values;

      const formData = new FormData();
      image[0]?.originFileObj && formData.append('image', image[0].originFileObj);

      Object.entries(rest).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      return submit(formData);
    },
    [submit]
  );

  const { error, pending, dispatch } = useSubmitForm(handleFinish, form);

  return (
    <AntForm
      form={form}
      name="product-form"
      layout="vertical"
      onFinish={dispatch}
      size="large"
      initialValues={{
        ...product,
        image: product?.imageUrl
          ? [{ uid: product.id, name: product.enName, url: product.imageUrl, status: 'done' }]
          : [],
      }}
    >
      <FormItem name="categoryId" label="Category" rules={[{ required: true }]}>
        <Select
          autoFocus
          allowClear
          placeholder="Select category"
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
          <Input placeholder="Enter English name" minLength={2} maxLength={100} />
        </FormItem>
        <FormItem
          required
          rules={[{ required: true, ...validationPatterns.validateArabicCharacters }]}
          name="arName"
          label="الأسم بالعربية"
          style={{ direction: 'rtl', flex: 1 }}
        >
          <Input placeholder="أكتب الأسم بالعربية" minLength={2} maxLength={100} />
        </FormItem>
      </Flex>

      <Flex gap={10}>
        <FormItem
          required
          rules={[{ required: true, ...validationPatterns.validateEnglishCharacters }]}
          name="enDescription"
          label="English Description"
          style={{ flex: 1 }}
        >
          <TextArea
            minLength={5}
            maxLength={500}
            placeholder="Enter English description"
            autoSize={{ minRows: 5, maxRows: 10 }}
          />
        </FormItem>
        <FormItem
          required
          rules={[{ required: true, ...validationPatterns.validateArabicCharacters }]}
          name="arDescription"
          label="الوصف بالعربية"
          style={{ direction: 'rtl', flex: 1 }}
        >
          <TextArea
            minLength={5}
            maxLength={500}
            placeholder="أكتب الوصف بالعربية"
            autoSize={{ minRows: 5, maxRows: 10 }}
          />
        </FormItem>
      </Flex>

      <Flex gap={10}>
        <FormItem
          required
          rules={[{ required: true }]}
          name="price"
          label="Price"
          style={{ flex: 1 }}
        >
          <InputNumber placeholder="Enter price" style={{ width: '100%' }} min={0} />
        </FormItem>
        <div style={{ flex: 1 }}></div>
      </Flex>

      <FormItem
        required
        name="image"
        valuePropName="fileList"
        rules={[{ required: true }]}
        label="Product Image"
        getValueFromEvent={args => {
          if (Array.isArray(args)) {
            return args;
          }

          return args?.fileList;
        }}
      >
        <Upload.Dragger
          maxCount={1}
          name="images"
          accept="image/*"
          listType="picture"
          onPreview={() => null}
          beforeUpload={() => false}
          showUploadList={{
            showRemoveIcon: true,
            showPreviewIcon: false,
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Upload.Dragger>
      </FormItem>

      {error?.message && <Text type="danger">{error.message}</Text>}

      <Flex gap={10}>
        <FormItem noStyle>
          <Button block type="primary" htmlType="submit" loading={pending}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </FormItem>
        <FormItem noStyle>
          <Button block onClick={() => router.back()} disabled={pending}>
            Cancel
          </Button>
        </FormItem>
      </Flex>
    </AntForm>
  );
};

export default Form;
