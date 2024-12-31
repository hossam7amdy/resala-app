'use client';

import { UploadOutlined } from '@ant-design/icons';
import { createId } from '@paralleldrive/cuid2';
import { Button, Upload } from 'antd';
import type { UploadProps } from 'antd';
import type { UploadFile } from 'antd/es/upload';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { MediaCrop } from '../media-crop/MediaCrop';
import { beforeCrop, beforeUpload } from './helpers';
import { handleUpload } from './xhr';

export interface MediaUploadProps extends UploadProps {
  onUploadError?: (file: UploadFile) => void;
  onUploadSuccess?: (file: UploadFile) => void;
}
const MediaUpload: React.FC<MediaUploadProps> = ({
  children,
  onUploadError,
  onUploadSuccess,
  ...props
}) => {
  const { refresh } = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'done') {
      setFileList(fileList.filter(file => file.uid !== info.file.uid));
      refresh();
      onUploadSuccess?.(info.file);
    } else if (info.file.status === 'error') {
      onUploadError?.(info.file);
    } else {
      setFileList(info.fileList);
    }
  };

  return (
    <MediaCrop
      showReset
      showGrid
      rotationSlider
      aspectSlider
      aspect={4 / 5}
      beforeCrop={beforeCrop}
      modalOk="Confirm"
    >
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
    </MediaCrop>
  );
};

export { MediaUpload };
