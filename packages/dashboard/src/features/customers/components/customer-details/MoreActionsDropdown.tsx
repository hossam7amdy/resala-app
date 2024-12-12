import { ResalaTooltip } from '@/components';
import { useCurrentUser } from '@/hooks/use-current-user';
import { EllipsisOutlined } from '@ant-design/icons';
import { type GetUserResponse, Role } from '@resala/shared';
import { Button, Dropdown, type MenuProps } from 'antd';
import React, { useRef } from 'react';

import { BanCustomerConfirm } from '../common/BanCustomerConfirm';
import { DeleteCustomerConfirm } from '../common/DeleteCustomerConfirm';

interface MoreActionsDropdownProps {
  user: GetUserResponse['data'];
}
const MoreActionsDropdown: React.FC<MoreActionsDropdownProps> = ({ user }) => {
  const { user: currentUser } = useCurrentUser();
  const banRef = useRef<{
    confirmBan: () => void;
    confirmUnban: () => void;
  }>();
  const deleteRef = useRef<{
    confirmDelete: () => void;
  }>();

  const handleBan = () => {
    banRef.current?.confirmBan();
  };

  const handleUnban = () => {
    banRef.current?.confirmUnban();
  };

  const handleDelete = () => {
    deleteRef.current?.confirmDelete();
  };

  const isCurrentUserNotAdmin = currentUser?.role !== Role.ADMIN;

  const items: MenuProps['items'] = [
    {
      key: 'ban',
      label: <>{user.banned ? 'Unban customer' : 'Ban customer'}</>,
      onClick: user.banned ? handleUnban : handleBan,
    },
    {
      key: 'delete',
      danger: true,
      disabled: isCurrentUserNotAdmin,
      label: (
        <ResalaTooltip title={isCurrentUserNotAdmin ? 'Only admins can delete customers' : ''}>
          Delete customer
        </ResalaTooltip>
      ),
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <BanCustomerConfirm ref={banRef} user={user} />
      <DeleteCustomerConfirm ref={deleteRef} user={user} />
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button size="small" type="text" icon={<EllipsisOutlined />} />
      </Dropdown>
    </>
  );
};

export { MoreActionsDropdown };
