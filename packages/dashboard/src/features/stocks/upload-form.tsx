import { uploadImages } from '@/actions/image';
import { useMutation, useNotifications } from '@/hooks';
import type { Image } from '@resala/shared';
import { Button, Flex, Form } from 'antd';
import type { UploadFile } from 'antd';
import React, { useState } from 'react';

import { ImageCropUpload } from './image-crop-dragger';

interface UploadFormProps {
  colorId: number;
  productId: number;
  images: Omit<Image, 'productId' | 'colorId'>[];
  onCancel: () => void;
}
export const UploadForm: React.FC<UploadFormProps> = ({ images, colorId, productId, onCancel }) => {
  const [form] = Form.useForm();
  const notification = useNotifications();
  const [fileList, setFileList] = useState<UploadFile[]>(
    images.map(img => ({
      uid: img.imageKey,
      url: img.imageUrl,
      name: img.imageKey,
      status: 'removed',
    }))
  );
  const { mutate, isLoading } = useMutation({
    mutationFn: uploadImages,
    onSuccess: () => {
      form.resetFields();
      notification.success('Images uploaded successfully.');
      return onCancel();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  const handleUpload = () => {
    const formData = new FormData();

    fileList.forEach(file => {
      if (file.status !== 'removed') {
        formData.append('images', file.originFileObj!);
      }
    });

    formData.append('productId', productId.toString());
    formData.append('colorId', colorId.toString());

    mutate(formData);
  };

  return (
    <Form form={form} name={`upload-form-${colorId}`} layout="vertical">
      <Form.Item>
        <ImageCropUpload
          disabled={isLoading}
          fileList={fileList}
          onChange={({ fileList }) => {
            setFileList(fileList);
          }}
        />
      </Form.Item>

      <Form.Item noStyle>
        <Flex gap={5}>
          <Button
            size="large"
            block
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!fileList.length}
            onClick={handleUpload}
          >
            Upload
          </Button>

          <Button block size="large" htmlType="submit" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
