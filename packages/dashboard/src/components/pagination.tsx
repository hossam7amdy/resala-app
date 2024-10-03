'use client';

import { useCreateSearchParams } from '@/hooks/use-create-search-params';
import { Pagination as AntPagination } from 'antd';
import type { PaginationProps } from 'antd';
import { useSearchParams } from 'next/navigation';

export const Pagination: React.FC<PaginationProps> = props => {
  const searchParams = useSearchParams();
  const { createSearchParams } = useCreateSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const createPageURL = (page: number | string, pageSize: number | string) => {
    createSearchParams({ page, limit: pageSize });
  };

  return (
    <AntPagination
      align="center"
      current={page}
      pageSize={limit}
      onChange={createPageURL}
      {...props}
    />
  );
};
