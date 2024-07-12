import { Tooltip } from '@/components';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import UploadForm from './upload-form';

const UploadModal: React.FC<{ productId: number; colorId: number }> = ({ productId, colorId }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Upload">
        <Button onClick={() => setOpen(true)} type="link" icon={<UploadOutlined />} />
      </Tooltip>

      <Modal
        open={open}
        destroyOnClose
        title="Upload Images"
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <UploadForm
          id={productId.toString()}
          colorId={colorId.toString()}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </>
  );
};

export default UploadModal;
