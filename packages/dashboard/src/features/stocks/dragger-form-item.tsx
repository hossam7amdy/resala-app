'use client';

import { InboxOutlined } from '@ant-design/icons';
import { Form, type FormItemProps, Upload } from 'antd';
import React from 'react';

export const DraggerFormItem: React.FC<FormItemProps> = props => {
  return (
    <Form.Item noStyle>
      <Form.Item
        required
        label="Images"
        name="images"
        valuePropName="fileList"
        rules={[{ required: true }]}
        getValueFromEvent={args => {
          if (Array.isArray(args)) {
            return args;
          }

          return args?.fileList;
        }}
        {...props}
      >
        <Upload.Dragger
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
            Support for a single or bulk upload. Strictly prohibited from uploading company data or
            other banned files.
          </p>
        </Upload.Dragger>
      </Form.Item>
    </Form.Item>
  );
};
