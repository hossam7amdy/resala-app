'use client';

import { MediaSelect } from '@/features/media';
import { StockFormItems, type StockFormItemsProps } from '@/features/stocks';
import type { Category, GetProductResponse } from '@resala/shared';
import { Button, Col, Flex, Form, Input, InputNumber, Row, Select } from 'antd';
import { useRouter } from 'next/navigation';

import { useCreateOrUpdateProduct } from '../hooks';
import type { ProductFormValues } from '../types';

interface ProductEditorProps extends StockFormItemsProps {
  product?: GetProductResponse['data'];
  categories: Category[];
}
const ProductEditor: React.FC<ProductEditorProps> = ({
  product,
  categories,
  medias,
  colors,
  sizes,
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
      onFinish={handleSubmit}
      initialValues={product}
      scrollToFirstError
    >
      <Form.Item
        required
        name="image"
        label="Product Image"
        rules={[{ required: true, message: 'Please select product image' }]}
        initialValue={product ? { id: product.imageKey, url: product.imageUrl } : undefined}
      >
        <MediaSelect
          medias={medias}
          initialSelection={product ? [{ url: product.imageUrl, id: product.imageKey }] : undefined}
          onConfirmSelect={images =>
            form.setFieldsValue({ image: { id: images[0].id, url: images[0].url } })
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

      <StockFormItems
        medias={medias}
        colors={colors}
        sizes={sizes}
        variants={product?.stocks.map(stock => ({
          color: stock.color.id,
          medias: stock.images.map(img => ({ id: img.imageKey, url: img.imageUrl })),
          sizes: stock.sizes.map(size => ({
            size: size.sizeId,
            quantity: size.quantity,
          })),
        }))}
      />

      <Form.Item className="mt-4">
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
