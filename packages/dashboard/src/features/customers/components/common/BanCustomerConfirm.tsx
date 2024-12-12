import { formatDateTime } from '@/utils/date-time-formatter';
import { type User } from '@resala/shared';
import { Form, Input, InputNumber, Modal } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';

import { useBanCustomer, useUnbanCustomer } from '../../hooks';

interface BanUserCellProps {
  user: User;
}

const BanCustomerConfirm = forwardRef(({ user }: BanUserCellProps, ref) => {
  const [form] = Form.useForm();
  const { banCustomer } = useBanCustomer();
  const { unbanCustomer } = useUnbanCustomer();
  const [modal, contextHolder] = Modal.useModal();

  const confirmBan = () => {
    modal.confirm({
      title: `Are you sure you want to ban ${user.firstName} ${user.lastName}?`,
      content: (
        <Form form={form} name={`ban-user-${user.id}`}>
          <Form.Item name="reason" label="Reason">
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} maxLength={500} />
          </Form.Item>
          <Form.Item name="duration" label="Duration" initialValue={1}>
            <InputNumber min={1} suffix="Days" className="w-full" />
          </Form.Item>
        </Form>
      ),
      onOk: () => banCustomer({ userId: user.id, ...form.getFieldsValue() }),
      okButtonProps: { danger: true },
      okText: 'Confirm',
      cancelText: 'Cancel',
    });
  };

  const confirmUnban = () => {
    modal.confirm({
      title: `Are you sure you want to unban ${user.firstName} ${user.lastName}?`,
      content: (
        <div>
          <p>Ban reason: {user.banReason}</p>
          <p>
            Ban until: {user?.banExpires ? formatDateTime(new Date(user.banExpires)) : 'Forever'}
          </p>
        </div>
      ),
      onOk: () => unbanCustomer({ userId: user.id }),
      okText: 'Confirm',
      cancelText: 'Cancel',
    });
  };

  useImperativeHandle(ref, () => ({
    confirmBan,
    confirmUnban,
  }));

  return <>{contextHolder}</>;
});

BanCustomerConfirm.displayName = 'BanCustomerConfirm';

export { BanCustomerConfirm };
