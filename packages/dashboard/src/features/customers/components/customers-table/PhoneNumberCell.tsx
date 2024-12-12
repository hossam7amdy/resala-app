import type { User } from '@resala/shared';
import { Badge } from 'antd';
import React from 'react';

export const PhoneNumberCell: React.FC<{ user: User }> = ({ user }) => {
  return <Badge status={user.phoneNumberVerified ? 'success' : 'error'} text={user.phoneNumber} />;
};
