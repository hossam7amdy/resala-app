'use client';

import { MAX_UPLOAD_IMAGE_COUNT } from '@/utils/constants';
import { DeleteOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

interface ImageCropUploadProps extends UploadProps {
  fileList: UploadFile[];
}
export const ImageCropUpload: React.FC<ImageCropUploadProps> = ({ fileList, ...props }) => {
  const displayUpload = fileList.length < MAX_UPLOAD_IMAGE_COUNT;
  return (
    <ImgCrop aspect={4 / 5}>
      <Upload
        disabled
        name="images"
        accept="image/*"
        listType="picture-card"
        onPreview={() => null}
        fileList={fileList}
        maxCount={MAX_UPLOAD_IMAGE_COUNT}
        showUploadList={{
          showRemoveIcon: true,
          showPreviewIcon: false,
          removeIcon: file => {
            const isRemoved = file.status === 'removed';
            return <DeleteOutlined style={{ cursor: isRemoved ? 'not-allowed' : undefined }} />;
          },
        }}
        onRemove={file => file.status !== 'removed'}
        {...props}
      >
        {displayUpload && `Upload (${fileList.length}/${MAX_UPLOAD_IMAGE_COUNT})`}
      </Upload>
    </ImgCrop>
  );
};
