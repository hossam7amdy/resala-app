'use client';

import type { GetUserResponse } from '@resala/shared';
import { Card } from 'antd';
import React from 'react';

import { ContactInfoSection } from './ContactInfoSection';
import { DefaultAddressSection } from './DefaultAddressSection';
import { MarketingStatusSection } from './MarketingStatusSection';
import { MoreActionsDropdown } from './MoreActionsDropdown';

interface CustomerDetailsCardProps {
  user: GetUserResponse['data'];
}
const CustomerDetailsCard: React.FC<CustomerDetailsCardProps> = ({ user }) => {
  return (
    <Card size="small" title="Customer" extra={<MoreActionsDropdown user={user} />}>
      <ContactInfoSection user={user} />
      <DefaultAddressSection addresses={user.addresses} className="mt-2" />
      <MarketingStatusSection user={user} className="mt-2" />
    </Card>
  );
};

export { CustomerDetailsCard };
