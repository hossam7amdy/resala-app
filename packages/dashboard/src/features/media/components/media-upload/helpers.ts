import { formatBytes } from '@/utils/formatBytes';
import { Upload, message } from 'antd';
import type { GetProp, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const MAX_SIZE = 25 * 1024 * 1024; // 25MB
const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/avif',
];

const isAcceptedType = (type: string) => ACCEPTED_TYPES.includes(type);
const isAcceptedSize = (size: number) => size < MAX_SIZE;

const beforeUpload = (file: FileType) => {
  const acceptedType = isAcceptedType(file.type);
  if (!acceptedType) {
    message.error('You can only upload JPG/PNG/GIF/WebP/AVIF file!');
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

export { beforeUpload, beforeCrop };
