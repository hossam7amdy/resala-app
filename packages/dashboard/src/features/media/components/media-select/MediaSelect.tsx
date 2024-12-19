'use client';

import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Divider, Image, Modal, Space } from 'antd';
import React, { useState } from 'react';

import { MediaUpload } from '../media-upload/MediaUpload';
import { MediaSelectList } from './MediaSelectList';
import type { RequiredMedia } from './types';

interface MediaSelectProps {
  medias: RequiredMedia[];
  multiple?: boolean;
  maxCount?: number;
  initialSelection?: RequiredMedia[];
  onConfirmSelect: (image: RequiredMedia[]) => void;
}
const MediaSelect: React.FC<MediaSelectProps> = ({
  initialSelection,
  onConfirmSelect,
  multiple,
  maxCount,
  medias,
}) => {
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<RequiredMedia[]>(
    initialSelection ? initialSelection : []
  );

  const toggleSelectModal = () => setSelectModalOpen(prev => !prev);

  return (
    <>
      <Space>
        <Image.PreviewGroup>
          {selectedImage.map(img => (
            <Image key={img.id} src={img.url} width={75} height={100} alt={img.filename} />
          ))}
        </Image.PreviewGroup>
        <Card
          className="w-[75px] h-[100px] cursor-pointer bg-gray-100 border-2 border-dotted border-gray-200 hover:border-gray-300"
          classNames={{ body: 'h-full flex justify-center items-center' }}
          onClick={toggleSelectModal}
        >
          <PlusOutlined />
        </Card>
      </Space>
      <Modal
        width={800}
        title="Select Image"
        open={selectModalOpen}
        okButtonProps={{ disabled: selectedImage.length === 0, className: 'px-6' }}
        onCancel={toggleSelectModal}
        onOk={() => {
          onConfirmSelect(selectedImage);
          toggleSelectModal();
        }}
      >
        <div className="flex justify-center cursor-pointer border-dashed border-primary-100 rounded-lg py-2 my-4 hover:border-primary-500">
          <MediaUpload>
            <div className="text-center">
              <p>
                <InboxOutlined className="text-5xl text-primary-400" />
              </p>
              <p className="text-lg">Click or drag file to this area to upload</p>
              <span className="text-gray-500">
                Support JPG/PNG/GIF/WebP up to 25MB!. Strictly prohibited from uploading company
                data or other banned files.
              </span>
            </div>
          </MediaUpload>
        </div>

        <Divider />

        <MediaSelectList
          options={medias}
          multiple={multiple}
          maxCount={maxCount}
          selected={selectedImage ? selectedImage : undefined}
          onSelect={medias => setSelectedImage(medias)}
        />
      </Modal>
    </>
  );
};

export { MediaSelect };
