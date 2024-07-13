import { Tooltip } from '@/components';
import { UploadOutlined } from '@ant-design/icons';
import type { GetStocksListResponse } from '@resala/shared';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import UploadForm from './upload-form';

const UploadModal: React.FC<{ stock: GetStocksListResponse['data']['stocks'][0] }> = ({
  stock,
}) => {
  const [open, setOpen] = useState(false);

  const moreThanFiveImages = stock.images.length >= 5;
  return (
    <>
      <Tooltip title={moreThanFiveImages ? 'Color has 5 images' : 'Upload'}>
        <Button
          disabled={moreThanFiveImages}
          onClick={() => setOpen(true)}
          type="link"
          icon={<UploadOutlined />}
        />
      </Tooltip>

      <Modal
        open={open}
        destroyOnClose
        title="Upload Images"
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <UploadForm
          id={stock.product.id.toString()}
          colorId={stock.color.id.toString()}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </>
  );
};

export default UploadModal;
