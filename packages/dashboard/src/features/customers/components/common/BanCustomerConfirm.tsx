import { type User } from '@resala/shared';
import { Form, Input, InputNumber, Modal } from 'antd';
import React from 'react';

import { useBanCustomer } from '../../hooks';

interface BanCustomerConfirmProps {
  user: User;
  renderTrigger: (trigger: () => void) => React.ReactNode;
}

const BanCustomerConfirm: React.FC<BanCustomerConfirmProps> = ({ user, renderTrigger }) => {
  const [form] = Form.useForm();
  const { banCustomer } = useBanCustomer();
  const [modal, contextHolder] = Modal.useModal();

  const confirmBan = () => {
    modal.confirm({
      title: `Are you sure you want to ban ${user.firstName} ${user.lastName}?`,
      content: (
        <Form form={form} name={`ban-user-${user.id}`}>
          <Form.Item name="reason" label="Reason">
            <Input.TextArea
              autoSize={{ minRows: 3, maxRows: 5 }}
              maxLength={500}
              placeholder="No reason"
            />
          </Form.Item>
          <Form.Item name="duration" label="Duration">
            <InputNumber min={0} suffix="Days" className="w-full" placeholder="0" />
          </Form.Item>
        </Form>
      ),
      onOk: () => banCustomer({ userId: user.id, ...form.getFieldsValue() }),
      okButtonProps: { danger: true },
      okText: 'Confirm',
      cancelText: 'Cancel',
    });
  };

  return (
    <>
      {contextHolder}
      {renderTrigger(confirmBan)}
    </>
  );
};

export { BanCustomerConfirm };
