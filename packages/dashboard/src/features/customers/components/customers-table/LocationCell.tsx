import type { ListUsersResponse } from '@resala/shared';
import React from 'react';

type LocationCellProps = {
  addresses: ListUsersResponse['data'][number]['addresses'];
};

const LocationCell: React.FC<LocationCellProps> = ({ addresses }) => {
  const defaultAddress = addresses.find(a => a.isDefault);

  if (!defaultAddress) {
    return <></>;
  }

  return (
    <span>{`${defaultAddress.city}, ${defaultAddress.state}, ${defaultAddress.country}`}</span>
  );
};

export { LocationCell };
