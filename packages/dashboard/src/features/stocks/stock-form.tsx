'use client';

import { uploadImages } from '@/actions/image';
import { createStock, updateStock } from '@/actions/stock';
import { listImages } from '@/data/images';
import { useMutation, useNotifications } from '@/hooks';
import type { Image } from '@resala/shared';
import { Button, Flex, Form, InputNumber } from 'antd';
import type { UploadFile } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { ImageCropUpload } from './image-crop-dragger';

type FormValues = {
  productId: number;
  colorId: number;
  sizeId: number;
  quantity: number;
};

interface StockFormProps {
  stock: Partial<{
    id: number;
    colorId: number;
    sizeId: number;
    productId: number;
    quantity: number;
  }>;
  selectSize: React.ReactNode;
  selectColor: React.ReactNode;
  selectProduct: React.ReactNode;
}
export const StockForm: React.FC<StockFormProps> = ({
  stock,
  selectColor,
  selectSize,
  selectProduct,
}) => {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const notification = useNotifications();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const colorId = Form.useWatch('colorId', form);
  const productId = Form.useWatch('productId', form);

  useEffect(() => {
    if (!colorId || !productId) return;

    listImages(productId, colorId).then(imagesList => {
      setFileList(
        imagesList.map((image: Image) => ({
          url: image.imageUrl,
          uid: image.id.toString(),
          name: image.imageKey,
          status: 'removed',
        }))
      );
    });
  }, [colorId, productId]);

  const isCreate = !stock?.id;

  const handleSubmit = (values: FormValues) => {
    const submit = isCreate ? createStock : updateStock.bind(null, stock.id!);

    const promiseAll: Promise<unknown>[] = [submit(values)];

    if (fileList.length) {
      const formData = new FormData();

      formData.append('colorId', colorId.toString());
      formData.append('productId', productId.toString());
      fileList.forEach(file => {
        if (file.status !== 'removed') {
          formData.append('images', file.originFileObj!);
        }
      });

      promiseAll.push(uploadImages(formData));
    }

    return Promise.all(promiseAll);
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      setFileList([]);
      form.resetFields();

      notification.success(`Stock has been ${isCreate ? 'created' : 'updated'} successfully`);

      !isCreate && router.back(); // Redirect to the previous page if it's an update
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <Form
      form={form}
      name="stock-form"
      layout="vertical"
      onFinish={mutate}
      size="large"
      initialValues={{ ...stock }}
    >
      {selectProduct}

      {selectColor}

      {selectSize}

      <Form.Item required rules={[{ required: true }]} hasFeedback name="quantity" label="Quantity">
        <InputNumber placeholder="Enter quantity" min={0} max={100000} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Stock Images">
        <ImageCropUpload
          disabled={isLoading || !productId || !colorId}
          fileList={fileList}
          onChange={({ fileList }) => {
            setFileList(fileList);
          }}
        />
      </Form.Item>

      <Form.Item noStyle>
        <Flex gap={10}>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Submit
          </Button>
          <Button type="default" block onClick={router.back} disabled={isLoading}>
            Cancel
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
