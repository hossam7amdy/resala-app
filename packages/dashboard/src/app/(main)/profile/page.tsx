'use client';

import { FormSkeleton } from '@/components';
import { EditCustomerForm } from '@/features/customers';
import { useCurrentUser } from '@/hooks/use-current-user';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const { user, isLoading } = useCurrentUser();
  const [canEdit, setCanEdit] = useState(false);
  const { back } = useRouter();

  const toggle = () => setCanEdit(e => !e);

  return (
    <Card title="My profile">
      <Flex justify="end" className="mb-5">
        <Button icon={<EditOutlined />} type="primary" onClick={toggle}>
          {canEdit ? 'Disable' : 'Enable'} edit
        </Button>
      </Flex>
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <EditCustomerForm disable={!canEdit} customer={user!} onCancel={back} onDone={back} />
      )}
    </Card>
  );
};

export default ProfilePage;
