import type { User } from '@resala/shared';
import { Flex } from 'antd';
import React from 'react';

import { EmailCell } from '../customers-table/EmailCell';
import { PhoneNumberCell } from '../customers-table/PhoneNumberCell';
import { EditContactInfoModal } from './EditContactInfoModal';

const ContactInfoSection: React.FC<{ user: User }> = ({ user }) => {
  return (
    <section>
      <Flex align="center" justify="space-between">
        <span className="font-semibold">Contact information</span>
        <EditContactInfoModal user={user} />
      </Flex>
      <p>{user.name}</p>
      <p>
        <EmailCell user={user} />
      </p>
      <p>
        <PhoneNumberCell user={user} />
      </p>
    </section>
  );
};

export { ContactInfoSection };
