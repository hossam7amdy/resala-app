'use client';

import { uploadProductImages } from '@/actions/image';
import useSubmitForm from '@/hooks/useSubmitForm';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Flex, Form, type UploadFile } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import Text from 'antd/es/typography/Text';
import Dragger from 'antd/es/upload/Dragger';

interface UploadFormProps {
  id: string;
  colorId: string;
  onCancel: () => void;
}
const UploadForm: React.FC<UploadFormProps> = ({ id, colorId, onCancel }) => {
  const [form] = useForm();
  const { pending, error, dispatch } = useSubmitForm(uploadProductImages, form);

  const handleFinish = (values: { images: UploadFile[] }) => {
    const formData = new FormData();

    formData.append('productId', id);
    formData.append('colorId', colorId);
    values.images.forEach(image => {
      formData.append('images', image.originFileObj!);
    });

    return dispatch(formData);
  };

  return (
    <Form
      form={form}
      name={`upload-form-${colorId}`}
      onFinish={handleFinish}
      layout="vertical"
      size="large"
    >
      <Form.Item label="Upload Product Images" noStyle>
        <FormItem
          required
          name="images"
          valuePropName="fileList"
          rules={[{ required: true }]}
          getValueFromEvent={args => {
            if (Array.isArray(args)) {
              return args;
            }

            return args?.fileList;
          }}
        >
          <Dragger
            multiple
            maxCount={5}
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
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data
              or other banned files.
            </p>
          </Dragger>
        </FormItem>
      </Form.Item>

      <FormItem noStyle>{error?.message && <Text type="danger">{error.message}</Text>}</FormItem>

      <FormItem noStyle>
        <Flex gap={10}>
          <Button block type="primary" htmlType="submit" loading={pending}>
            Upload
          </Button>
          <Button block onClick={onCancel} disabled={pending}>
            Cancel
          </Button>
        </Flex>
      </FormItem>
    </Form>
  );
};

export default UploadForm;
