import { EditOutlined } from '@ant-design/icons';
import type { User } from '@resala/shared';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import { EditMarketingReferencesForm } from '../common/EditMarketingReferencesForm';

interface EditMarketingReferencesModalProps {
  user: User;
}
const EditMarketingReferencesModal: React.FC<EditMarketingReferencesModalProps> = ({ user }) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(prev => !prev);

  return (
    <>
      <Modal
        centered
        open={open}
        destroyOnClose
        footer={null}
        title={'Edit marketing status'}
        onCancel={toggleModal}
        width={620}
      >
        <EditMarketingReferencesForm customer={user} onDone={toggleModal} onCancel={toggleModal} />
      </Modal>
      <Button size="small" type="text" icon={<EditOutlined />} onClick={toggleModal} />
    </>
  );
};

export { EditMarketingReferencesModal };
