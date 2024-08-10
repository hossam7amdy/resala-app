'use client';

import { Pagination as AntPagination } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Pagination: React.FC<{ totalPages: number }> = ({ totalPages }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const createPageURL = (page: number | string, pageSize: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    params.set('limit', pageSize.toString());

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <AntPagination current={page} pageSize={limit} total={totalPages} onChange={createPageURL} />
  );
};
