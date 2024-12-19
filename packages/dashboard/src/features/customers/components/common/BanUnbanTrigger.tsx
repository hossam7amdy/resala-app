import { ResalaTooltip } from '@/components';
import { useCurrentUser } from '@/hooks';
import { Role, type User } from '@resala/shared';
import React from 'react';

import { BanCustomerConfirm } from '../common/BanCustomerConfirm';
import { UnbanCustomerConfirm } from '../common/UnbanCustomerConfirm';

interface BanUnbanTriggerProps {
  user: User;
}
const BanUnbanTrigger: React.FC<BanUnbanTriggerProps> = ({ user }) => {
  const { user: currentUser } = useCurrentUser();
  const isCurrentUserNotAdmin = currentUser?.role !== Role.ADMIN;

  return (
    <ResalaTooltip title={isCurrentUserNotAdmin ? 'Only admins can ban customers' : ''}>
      {user.banned ? (
        <UnbanCustomerConfirm
          user={user}
          renderTrigger={trigger => <span onClick={trigger}>Unban customer</span>}
        />
      ) : (
        <BanCustomerConfirm
          user={user}
          renderTrigger={trigger => <span onClick={trigger}>Ban customer</span>}
        />
      )}
    </ResalaTooltip>
  );
};

export { BanUnbanTrigger };
