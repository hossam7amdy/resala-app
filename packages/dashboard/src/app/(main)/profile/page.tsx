'use client';

import { EditForm } from '@/features/customers';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Flex } from 'antd';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const { data } = useSession();
  const [canEdit, setCanEdit] = useState(false);

  const toggle = () => setCanEdit(e => !e);

  return (
    <Card title="My profile" loading={!data?.user}>
      <Flex justify="end" className="mb-5">
        <Button icon={<EditOutlined />} type="primary" size="large" onClick={toggle}>
          {canEdit ? 'Disable' : 'Enable'} edit
        </Button>
      </Flex>
      <EditForm disable={!canEdit} customer={data?.user ?? {}} />
    </Card>
  );
};

export default ProfilePage;
