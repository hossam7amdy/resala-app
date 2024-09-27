'use client';

import { addProduct, updateProduct } from '@/fetch/products';
import { useMutation, useNotification } from '@/hooks';
import { PlusOutlined } from '@ant-design/icons';
import { type Category, type Product, validationPatterns } from '@resala/shared';
import {
  Form as AntForm,
  Button,
  Col,
  Flex,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  type UploadFile,
} from 'antd';
import ImgCrop from 'antd-img-crop';
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

export const Form: React.FC<{ product?: Product; categories: Category[] }> = ({
  product,
  categories,
}) => {
  const [form] = AntForm.useForm();

  const router = useRouter();

  const notification = useNotification();

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

  const { isLoading, mutate } = useMutation({
    mutationFn: handleFinish,
    onSuccess: () => {
      form.resetFields();

      notification.success('Product updated successfully');

      isEdit ? router.back() : null;
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <AntForm
      form={form}
      name="product-form"
      layout="vertical"
      onFinish={mutate}
      size="large"
      initialValues={{
        ...product,
        image: product?.imageUrl
          ? [{ uid: product.id, name: product.enName, url: product.imageUrl, status: 'done' }]
          : [],
      }}
    >
      <AntForm.Item
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
        <ImgCrop aspect={4 / 5}>
          <Upload
            maxCount={1}
            accept="image/*"
            listType="picture-card"
            onPreview={() => null}
            showUploadList={{
              showRemoveIcon: true,
              showPreviewIcon: false,
            }}
            onChange={({ fileList }) => {
              form.setFieldsValue({ image: fileList });
            }}
          >
            <button type="button" className="bg-transparent border-none cursor-pointer">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </ImgCrop>
      </AntForm.Item>

      <AntForm.Item name="categoryId" label="Category" rules={[{ required: true }]}>
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
      </AntForm.Item>

      <Row gutter={10}>
        <Col span={24} md={{ span: 12 }}>
          <AntForm.Item
            required
            rules={[{ required: true, ...validationPatterns.validateEnglishCharacters }]}
            name="enName"
            label="English Name"
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter English name" minLength={2} maxLength={100} />
          </AntForm.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <AntForm.Item
            required
            rules={[{ required: true, ...validationPatterns.validateArabicCharacters }]}
            name="arName"
            label="الأسم بالعربية"
            style={{ direction: 'rtl', flex: 1 }}
          >
            <Input placeholder="أكتب الأسم بالعربية" minLength={2} maxLength={100} />
          </AntForm.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={24} md={{ span: 12 }}>
          <AntForm.Item
            required
            rules={[{ required: true, ...validationPatterns.validateEnglishCharacters }]}
            name="enDescription"
            label="English Description"
            style={{ flex: 1 }}
          >
            <Input.TextArea
              minLength={5}
              maxLength={500}
              placeholder="Enter English description"
              autoSize={{ minRows: 5, maxRows: 10 }}
            />
          </AntForm.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <AntForm.Item
            required
            rules={[{ required: true, ...validationPatterns.validateArabicCharacters }]}
            name="arDescription"
            label="الوصف بالعربية"
            style={{ direction: 'rtl', flex: 1 }}
          >
            <Input.TextArea
              minLength={5}
              maxLength={500}
              placeholder="أكتب الوصف بالعربية"
              autoSize={{ minRows: 5, maxRows: 10 }}
            />
          </AntForm.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={24} md={{ span: 12 }}>
          <AntForm.Item
            required
            rules={[{ required: true }]}
            name="price"
            label="Price"
            style={{ flex: 1 }}
          >
            <InputNumber placeholder="Enter price" style={{ width: '100%' }} min={0} />
          </AntForm.Item>
        </Col>
      </Row>

      <Flex gap={10}>
        <AntForm.Item noStyle>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </AntForm.Item>
        <AntForm.Item noStyle>
          <Button block onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
        </AntForm.Item>
      </Flex>
    </AntForm>
  );
};
