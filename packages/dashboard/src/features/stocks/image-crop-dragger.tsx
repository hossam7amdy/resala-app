'use client';

import { Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useRef } from 'react';

const MAX_COUNT = 5;

interface UploadFormProps extends UploadProps {
  curCount: number;
  fileList: UploadFile[];
}
export const ImageCropDragger: React.FC<UploadFormProps> = ({ curCount, fileList, ...props }) => {
  const maxCountRef = useRef(MAX_COUNT - curCount);

  const displayUpload = curCount < MAX_COUNT;
  return (
    <ImgCrop aspect={4 / 5}>
      <Upload
        disabled
        maxCount={maxCountRef.current}
        name="images"
        accept="image/*"
        listType="picture-card"
        onPreview={() => null}
        fileList={fileList}
        showUploadList={{
          showRemoveIcon: true,
          showPreviewIcon: false,
        }}
        {...props}
      >
        {displayUpload && `Upload (${curCount}/${MAX_COUNT})`}
      </Upload>
    </ImgCrop>
  );
};
