'use client';

import { uploadProductImages } from '@/actions/image';
import { ErrorMessage } from '@/components';
import { useMutation } from '@/hooks';
import { Button, Flex, Form, type UploadFile } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { DraggerFormItem } from './dragger-form-item';

interface UploadFormProps {
  id: string;
  colorId: string;
  onCancel: () => void;
}
const UploadForm: React.FC<UploadFormProps> = ({ id, colorId, onCancel }) => {
  const [form] = useForm();
  const { isLoading, error, mutate } = useMutation({
    mutationFn: uploadProductImages,
    onSuccess: () => {
      form.resetFields();
      onCancel();
    },
  });

  const handleFinish = (values: { images: UploadFile[] }) => {
    const formData = new FormData();

    formData.append('productId', id);
    formData.append('colorId', colorId);
    values.images.forEach(image => {
      formData.append('images', image.originFileObj!);
    });

    return mutate(formData);
  };

  return (
    <Form
      form={form}
      name={`upload-form-${colorId}`}
      onFinish={handleFinish}
      layout="vertical"
      size="large"
    >
      <DraggerFormItem />

      <Form.Item noStyle>{error?.message && <ErrorMessage message={error.message} />}</Form.Item>

      <Form.Item noStyle>
        <Flex gap={10}>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Upload
          </Button>
          <Button block onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default UploadForm;
