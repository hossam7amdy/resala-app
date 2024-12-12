import type { User } from '@resala/shared';
import { Button, type ButtonProps } from 'antd';
import React from 'react';

import { BanUnbanTrigger } from '../common/BanUnbanTrigger';

interface BanUserCellProps extends ButtonProps {
  user: User;
}

const BanUserCell: React.FC<BanUserCellProps> = ({ user, ...props }) => {
  const banned = user.banned;
  return (
    <Button size="small" danger={!banned} type={banned ? 'link' : 'text'} {...props}>
      <BanUnbanTrigger user={user} />
    </Button>
  );
};

export { BanUserCell };
