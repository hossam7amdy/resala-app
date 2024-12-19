import { useCurrentUser } from '@/hooks';
import { EllipsisOutlined } from '@ant-design/icons';
import { type GetUserResponse, Role } from '@resala/shared';
import { Button, Dropdown, type MenuProps } from 'antd';
import React from 'react';

import { BanUnbanTrigger } from '../common/BanUnbanTrigger';
import { DeleteCustomerConfirm } from '../common/DeleteCustomerConfirm';

interface MoreActionsDropdownProps {
  user: GetUserResponse['data'];
}
const MoreActionsDropdown: React.FC<MoreActionsDropdownProps> = ({ user }) => {
  const { user: currentUser } = useCurrentUser();
  const isCurrentUserNotAdmin = currentUser?.role !== Role.ADMIN;

  const items: MenuProps['items'] = [
    {
      key: 'ban',
      disabled: isCurrentUserNotAdmin,
      label: <BanUnbanTrigger user={user} />,
    },
    {
      key: 'delete',
      danger: true,
      disabled: isCurrentUserNotAdmin,
      label: (
        <DeleteCustomerConfirm
          user={user}
          renderTrigger={trigger => <span onClick={trigger}>Delete customer</span>}
        />
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button size="small" type="text" icon={<EllipsisOutlined />} />
    </Dropdown>
  );
};

export { MoreActionsDropdown };
