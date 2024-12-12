'use client';

import { useCreateSearchParams } from '@/hooks/use-create-search-params';
import { OffsetPageParamsSchema } from '@resala/shared';
import { Pagination as AntPagination } from 'antd';
import type { PaginationProps } from 'antd';
import { useSearchParams } from 'next/navigation';

export const Pagination: React.FC<PaginationProps> = props => {
  const searchParams = useSearchParams();
  const { createSearchParams } = useCreateSearchParams();

  const { page, limit } = OffsetPageParamsSchema.parse({
    page: searchParams.get('page') || undefined,
    limit: searchParams.get('limit') || undefined,
  });

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
