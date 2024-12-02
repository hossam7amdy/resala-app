import { useCurrentUser } from '@/hooks/use-current-user';
import { Avatar, Skeleton, Space, Typography } from 'antd';
import React from 'react';

export const UserInfo: React.FC = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <Space>
        <Skeleton.Avatar active />
        <Skeleton.Input active />
      </Space>
    );
  }

  return (
    <Space>
      <Avatar size="large" shape="square">
        {user?.firstName?.at(0)}
      </Avatar>

      <div>
        <Typography.Paragraph className="m-0 w-[200px]" ellipsis={{ tooltip: true }}>
          {user?.firstName} {user?.lastName}
        </Typography.Paragraph>
        <Typography.Paragraph
          type="secondary"
          className="text-xs font-normal m-0 w-[200px]"
          ellipsis={{ tooltip: true }}
        >
          {user?.email}
        </Typography.Paragraph>
      </div>
    </Space>
  );
};
