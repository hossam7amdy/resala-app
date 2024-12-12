import type { User } from '@resala/shared';
import { Badge } from 'antd';
import React from 'react';

export const EmailCell: React.FC<{ user: User }> = ({ user }) => {
  return <Badge status={user.emailVerified ? 'success' : 'error'} text={user.email} />;
};
