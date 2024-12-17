'use client';

import { UploadOutlined } from '@ant-design/icons';
import { createId } from '@paralleldrive/cuid2';
import { Button, Upload } from 'antd';
import type { UploadProps } from 'antd';
import ImgCrop, { type ImgCropProps } from 'antd-img-crop';
import type { UploadFile } from 'antd/es/upload';
import React, { useState } from 'react';

import { beforeCrop, beforeUpload } from './helpers';
import { handleUpload } from './xhr';

export interface MediaUploadProps extends UploadProps {
  cropProps?: ImgCropProps;
  onUploadError?: (file: UploadFile) => void;
  onUploadSuccess?: (file: UploadFile) => void;
}
const MediaUpload: React.FC<MediaUploadProps> = ({
  children,
  cropProps,
  onUploadError,
  onUploadSuccess,
  ...props
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'done') {
      setFileList(fileList.filter(file => file.uid !== info.file.uid));
      onUploadSuccess?.(info.file);
    } else if (info.file.status === 'error') {
      onUploadError?.(info.file);
    } else {
      setFileList(info.fileList);
    }
  };

  return (
    <ImgCrop aspect={4 / 5} beforeCrop={beforeCrop} modalOk="Confirm" {...cropProps}>
      <Upload
        name="media-uploader"
        accept="image/*"
        fileList={fileList}
        onChange={handleChange}
        customRequest={handleUpload}
        beforeUpload={file => {
          file.uid = createId();
          return beforeUpload(file);
        }}
        onRemove={file => {
          file.xhr?.abort();
          return !!file.xhr?.abort;
        }}
        {...props}
      >
        {children || (
          <Button type="primary" icon={<UploadOutlined />}>
            Upload Media
          </Button>
        )}
      </Upload>
    </ImgCrop>
  );
};

export { MediaUpload };
