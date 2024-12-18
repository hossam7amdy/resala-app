'use client';

import type { Category, Media, Product } from '@resala/shared';
import { Button, Col, Flex, Form, Input, InputNumber, Row, Select } from 'antd';
import { useRouter } from 'next/navigation';

import { useCreateOrUpdateProduct } from '../hooks';
import { SelectProductImage } from './SelectProductImage';

interface ProductFormValues {
  image: Pick<Media, 'id' | 'url'>;
  categoryId: string;
  enName: string;
  arName: string;
  enDescription: string;
  arDescription: string;
  price: number;
}

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
    <Form<ProductFormValues>
      form={form}
      name="product-form"
      layout="vertical"
      onFinish={({ image, ...values }) => {
        handleSubmit({ ...values, imageKey: image.id, imageUrl: image.url });
      }}
      initialValues={product}
    >
      <Form.Item
        name="image"
        label="Product Image"
        initialValue={product ? { url: product.imageUrl, id: product.imageKey } : undefined}
      >
        <SelectProductImage
          initialSelection={product ? { url: product.imageUrl, id: product.imageKey } : undefined}
          onConfirmSelect={image =>
            form.setFieldsValue({ image: { id: image.id, url: image.url } })
          }
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
            rules={[{ required: true, message: 'Please enter English name' }]}
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
            rules={[{ required: true, message: 'Please enter Arabic name' }]}
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
            rules={[{ required: true, message: 'Please enter English description' }]}
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
            rules={[{ required: true, message: 'Please enter Arabic description' }]}
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
