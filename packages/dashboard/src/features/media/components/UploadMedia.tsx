'use client';

import { getUploadUrl, setMediaMetadata } from '@/fetch/media';
import { useNotification } from '@/hooks';
import { formatBytes } from '@/utils/formatBytes';
import { UploadOutlined } from '@ant-design/icons';
import { createId } from '@paralleldrive/cuid2';
import { Button, Upload, message } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import ImgCrop, { type ImgCropProps } from 'antd-img-crop';
import type { RcFile, UploadFile } from 'antd/es/upload';
import React, { useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const MAX_SIZE = 25 * 1024 * 1024; // 25MB
const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

const isAcceptedType = (type: string) => ACCEPTED_TYPES.includes(type);
const isAcceptedSize = (size: number) => size < MAX_SIZE;

const beforeUpload = (file: FileType) => {
  const acceptedType = isAcceptedType(file.type);
  if (!acceptedType) {
    message.error('You can only upload JPG/PNG/GIF/WebP file!');
  }
  const acceptedSize = isAcceptedSize(file.size);
  if (!acceptedSize) {
    message.error(`Image must be smaller than ${formatBytes(MAX_SIZE)}!`);
  }
  return (acceptedSize && acceptedType) || Upload.LIST_IGNORE;
};

const beforeCrop = (file: FileType) => {
  return isAcceptedSize(file.size) && file.type.startsWith('image/');
};

const handleUpload: UploadProps['customRequest'] = async ({
  file,
  onSuccess,
  onError,
  onProgress,
}) => {
  try {
    const rcFile = file as RcFile & { xhr?: XMLHttpRequest };
    // Get upload URL
    const uploadUrl = await getUploadUrl(rcFile.uid);

    // Use XMLHttpRequest to track progress
    const xhr = new XMLHttpRequest();

    // check if xhr is aborted before starting the upload
    xhr.open('PUT', uploadUrl, true);

    // Store the xhr object in the file object
    rcFile.xhr = xhr;

    // Update progress
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress?.({ percent, ...e }, rcFile);
      } else {
        onProgress?.(e, rcFile);
      }
    };

    // Handle success and error
    xhr.onload = async e => {
      if (xhr.status === 200) {
        await setMediaMetadata(rcFile.uid, {
          size: rcFile.size,
          filename: rcFile.name,
          mimetype: rcFile.type,
        });
        onSuccess?.(e, rcFile);
      } else {
        onError?.(e, rcFile);
      }
    };

    // Handle error
    xhr.onerror = e => {
      onError?.(e, rcFile);
    };

    // Send the file
    xhr.send(rcFile);
  } catch (e) {
    onError?.(e as Error);
  }
};

interface UploadMediaProps extends UploadProps {
  cropProps?: ImgCropProps;
}
const UploadMedia: React.FC<UploadMediaProps> = ({ children, cropProps, ...props }) => {
  const notify = useNotification();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'done') {
      setFileList(fileList.filter(file => file.uid !== info.file.uid));
      notify.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      notify.error(`${info.file.name} file upload failed.`);
    } else {
      setFileList(info.fileList);
    }
  };

  return (
    <ImgCrop aspect={4 / 5} beforeCrop={beforeCrop} {...cropProps}>
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

export { UploadMedia };
