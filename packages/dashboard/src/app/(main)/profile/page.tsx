'use client';

import { EditForm } from '@/features/customers';
import { useCurrentUser } from '@/hooks/use-current-user';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Flex } from 'antd';
import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const { user, isLoading } = useCurrentUser();
  const [canEdit, setCanEdit] = useState(false);

  const toggle = () => setCanEdit(e => !e);

  return (
    <Card title="My profile" loading={isLoading}>
      <Flex justify="end" className="mb-5">
        <Button icon={<EditOutlined />} type="primary" size="large" onClick={toggle}>
          {canEdit ? 'Disable' : 'Enable'} edit
        </Button>
      </Flex>
      <EditForm disable={!canEdit} customer={user ?? {}} />
    </Card>
  );
};

export default ProfilePage;
