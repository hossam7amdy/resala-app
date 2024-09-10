import { Modal, Spin } from 'antd';
import React from 'react';

export const FullscreenSpinner: React.FC = () => {
  return (
    <Modal
      open={true}
      footer={null}
      closable={false}
      centered
      className="w-min"
      classNames={{
        content: 'w-min bg-transparent shadow-none',
      }}
    >
      <Spin />
    </Modal>
  );
};
