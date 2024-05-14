import { Modal } from 'antd';
import React from 'react';

import CreateSizePage from '../../../sizes/create/page';

const CreateSizeModal = () => {
  return (
    <Modal open title="Create Size" footer={null} closable={false}>
      <CreateSizePage />
    </Modal>
  );
};

export default CreateSizeModal;
