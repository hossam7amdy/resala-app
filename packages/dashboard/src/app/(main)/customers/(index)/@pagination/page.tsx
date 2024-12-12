import { Pagination } from '@/components';
import { countUsers } from '@/fetch/users';
import React from 'react';

const PaginationSlot = async () => {
  const total = await countUsers();

  return <Pagination total={total} />;
};

export default PaginationSlot;
