import { EditOutlined } from '@ant-design/icons';
import type { User } from '@resala/shared';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import { EditCustomerForm } from '../common/EditCustomerInfoForm';

interface EditContactInfoModalProps {
  user: User;
}
const EditContactInfoModal: React.FC<EditContactInfoModalProps> = ({ user }) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(prev => !prev);

  return (
    <>
      <Modal
        centered
        open={open}
        destroyOnClose
        footer={null}
        title={'Edit customer'}
        onCancel={toggleModal}
        width={620}
      >
        <EditCustomerForm customer={user} onDone={toggleModal} onCancel={toggleModal} />
      </Modal>
      <Button size="small" type="text" icon={<EditOutlined />} onClick={toggleModal} />
    </>
  );
};

export { EditContactInfoModal };
