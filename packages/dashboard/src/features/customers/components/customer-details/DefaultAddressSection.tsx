import { EditOutlined } from '@ant-design/icons';
import type { GetUserResponse } from '@resala/shared';
import { Button, Flex } from 'antd';
import React from 'react';

interface DefaultAddressSectionProps {
  addresses: GetUserResponse['data']['addresses'];
  className?: HTMLElement['className'];
}
const DefaultAddressSection: React.FC<DefaultAddressSectionProps> = ({ addresses, ...props }) => {
  const defaultAddress = addresses.find(address => address.isDefault) || addresses.at(0);

  const withoutDefaultAddress = !addresses.some(address => address.isDefault);
  return (
    <section {...props}>
      <Flex align="center" justify="space-between">
        <span className="font-semibold">
          Default address {withoutDefaultAddress && '(Not specified)'}
        </span>
        <Button size="small" type="text" icon={<EditOutlined />} />
      </Flex>
      <p>
        {defaultAddress?.firstName} {defaultAddress?.lastName}
      </p>
      <p>{defaultAddress?.company}</p>
      <p>{defaultAddress?.address}</p>
      <p>{defaultAddress?.street}</p>
      <p>{defaultAddress?.city}</p>
      <p>{defaultAddress?.state}</p>
      <p>{defaultAddress?.zip}</p>
      <p>{defaultAddress?.country}</p>
      <p>{defaultAddress?.phone}</p>
    </section>
  );
};

export { DefaultAddressSection };
