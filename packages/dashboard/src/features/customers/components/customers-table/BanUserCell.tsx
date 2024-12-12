import type { User } from '@resala/shared';
import { Button, type ButtonProps } from 'antd';
import React, { useRef } from 'react';

import { BanCustomerConfirm } from '../common/BanCustomerConfirm';

interface BanUserCellProps extends ButtonProps {
  user: User;
}

const BanUserCell: React.FC<BanUserCellProps> = ({ user, ...props }) => {
  const banUserCellRef = useRef<{
    confirmBan: () => void;
    confirmUnban: () => void;
  }>();

  const handleBan = () => {
    banUserCellRef.current?.confirmBan();
  };

  const handleUnban = () => {
    banUserCellRef.current?.confirmUnban();
  };

  const banned = !!user.banned;
  return (
    <>
      <BanCustomerConfirm ref={banUserCellRef} user={user} />
      <Button
        size="small"
        danger={!banned}
        type={banned ? 'link' : 'text'}
        onClick={() => {
          return banned ? handleUnban() : handleBan();
        }}
        {...props}
      >
        {banned ? 'Unban' : 'Ban'}
      </Button>
    </>
  );
};

export { BanUserCell };
