import { ResalaTooltip } from '@/components';
import { UploadOutlined } from '@ant-design/icons';
import type { ListStocksResponse } from '@resala/shared';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import { UploadForm } from './upload-form';

export const UploadModal: React.FC<{ stock: ListStocksResponse['data']['stocks'][0] }> = ({
  stock,
}) => {
  const [open, setOpen] = useState(false);

  const moreThanFiveImages = stock.images.length >= 5;
  return (
    <>
      <ResalaTooltip title={moreThanFiveImages ? 'Color has 5 images' : 'Upload'}>
        <Button
          disabled={moreThanFiveImages}
          onClick={() => setOpen(true)}
          type="link"
          icon={<UploadOutlined />}
        />
      </ResalaTooltip>

      <Modal
        open={open}
        destroyOnClose
        title="Upload Images"
        maskClosable={false}
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
      >
        {!moreThanFiveImages && (
          <UploadForm
            images={stock.images}
            colorId={stock.color.id}
            productId={stock.product.id}
            onCancel={() => setOpen(false)}
          />
        )}
      </Modal>
    </>
  );
};
