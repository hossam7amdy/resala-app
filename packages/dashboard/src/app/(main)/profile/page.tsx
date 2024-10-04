'use client';

import { FormSkeleton } from '@/components';
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
    <Card title="My profile">
      <Flex justify="end" className="mb-5">
        <Button icon={<EditOutlined />} type="primary" onClick={toggle}>
          {canEdit ? 'Disable' : 'Enable'} edit
        </Button>
      </Flex>
      {isLoading ? <FormSkeleton /> : <EditForm disable={!canEdit} customer={user ?? {}} />}
    </Card>
  );
};

export default ProfilePage;
