import type { MarketingStateType, User } from '@resala/shared';
import { Checkbox, Flex } from 'antd';
import React from 'react';

import { EditMarketingReferencesModal } from './EditMarketingReferencesModal';

const MarketingStatus: React.FC<{ type: 'Email' | 'SMS'; status: MarketingStateType }> = ({
  status,
  type,
}) => {
  return (
    <p>
      <Checkbox checked={false} indeterminate={status === 'subscribed'} className="cursor-default">
        {type} {status.replace('_', ' ')}
      </Checkbox>
    </p>
  );
};

interface MarketingStatusSectionProps {
  user: User;
  className?: HTMLElement['className'];
}
const MarketingStatusSection: React.FC<MarketingStatusSectionProps> = ({ user, ...props }) => {
  return (
    <section {...props}>
      <Flex align="center" justify="space-between">
        <span className="font-semibold">Marketing</span>
        <EditMarketingReferencesModal user={user} />
      </Flex>
      <MarketingStatus type="Email" status={user.emailMarketingState} />
      <MarketingStatus type="SMS" status={user.smsMarketingState} />
    </section>
  );
};

export { MarketingStatusSection };
