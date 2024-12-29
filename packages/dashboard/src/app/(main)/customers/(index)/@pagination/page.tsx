import { countUsers } from '@/actions/users';
import { Pagination } from '@/components';
import React from 'react';

const PaginationSlot = async () => {
  const total = await countUsers();

  return <Pagination total={total} />;
};

export default PaginationSlot;
