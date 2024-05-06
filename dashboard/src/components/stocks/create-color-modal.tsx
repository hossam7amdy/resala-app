'use client';

import CreateColorPage from '@/app/(main)/stocks/colors/create/page';
import { Button, Modal } from 'antd';
import { useState } from 'react';

const CreateColorModal = () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(prev => !prev);
  };

  return (
    <>
      <Modal open={visible} onCancel={toggle} title="Create Color" footer={null}>
        <CreateColorPage />
      </Modal>
      <Button onClick={toggle}>Add Color</Button>
    </>
  );
};

export default CreateColorModal;
