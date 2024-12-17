'use client';

import { MediaSelect, MediaUpload } from '@/features/media';
import { listMedias } from '@/fetch/media';
import { useQuery } from '@/hooks';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import type { Media } from '@resala/shared';
import { Card, Divider, Image, Modal, Space } from 'antd';
import React, { useState } from 'react';

interface SelectProductImageProps {
  initialSelection?: Media;
  onConfirmSelect: (image: Media) => void;
}
const SelectProductImage: React.FC<SelectProductImageProps> = ({
  initialSelection,
  onConfirmSelect,
}) => {
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Media | undefined>(initialSelection);

  const { data: options, refetch } = useQuery({
    queryFn: listMedias,
  });

  const toggleSelectModal = () => setSelectModalOpen(prev => !prev);

  return (
    <>
      <Space>
        {selectedImage && (
          <Image src={selectedImage.url} width={75} height={100} alt={selectedImage.filename} />
        )}
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
        okButtonProps={{ disabled: !selectedImage, className: 'px-6' }}
        onCancel={toggleSelectModal}
        onOk={() => {
          if (selectedImage) onConfirmSelect(selectedImage);
          toggleSelectModal();
        }}
      >
        <div className="flex justify-center cursor-pointer border-dashed border-2 border-gray-300 rounded-lg py-2 my-4 hover:border-primary-300">
          <MediaUpload onUploadSuccess={refetch}>
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

        {options ? (
          <MediaSelect
            options={options}
            selected={selectedImage ? [selectedImage] : []}
            onSelect={medias => setSelectedImage(medias[0])}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Modal>
    </>
  );
};

export { SelectProductImage };
