'use client';

import { type Category, type Product, validationPatterns } from '@resala/shared';
import { Button, Col, Flex, Form, Input, InputNumber, Row, Select } from 'antd';
import { useRouter } from 'next/navigation';

import { useCreateOrUpdateProduct } from '../hooks';
import { SelectProductImage } from './SelectProductImage';

const ProductEditor: React.FC<{ product?: Product; categories: Category[] }> = ({
  product,
  categories,
}) => {
  const { back } = useRouter();
  const [form] = Form.useForm();
  const { handleSubmit, isLoading } = useCreateOrUpdateProduct({
    form,
    isEdit: !!product,
    productId: product?.id,
  });

  return (
    <Form
      form={form}
      name="product-form"
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={product}
    >
      <Form.Item hidden name="imageKey" />
      <Form.Item required name="imageUrl" rules={[{ required: true }]} label="Product Image">
        <SelectProductImage
          initialSelection={
            product
              ? {
                  id: product.id,
                  url: product?.imageUrl,
                  filename: product.enName,
                  size: 0,
                  createdAt: '',
                  updatedAt: '',
                }
              : undefined
          }
          onConfirmSelect={image => {
            form.setFieldsValue({ imageUrl: image.url, imageKey: image.id });
          }}
        />
      </Form.Item>

      <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
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
      </Form.Item>

      <Row gutter={10}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            required
            rules={[{ required: true, ...validationPatterns.validateEnglishCharacters }]}
            name="enName"
            label="English Name"
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter English name" minLength={2} maxLength={100} />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            required
            rules={[{ required: true, ...validationPatterns.validateArabicCharacters }]}
            name="arName"
            label="الأسم بالعربية"
            style={{ direction: 'rtl', flex: 1 }}
          >
            <Input placeholder="أكتب الأسم بالعربية" minLength={2} maxLength={100} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
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
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
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
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            required
            rules={[{ required: true }]}
            name="price"
            label="Price"
            style={{ flex: 1 }}
          >
            <InputNumber placeholder="Enter price" style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Flex gap={10}>
          <Button block onClick={back} disabled={isLoading}>
            Cancel
          </Button>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Confirm
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export { ProductEditor };
