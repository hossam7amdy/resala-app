'use client';

import Search from 'antd/es/input/Search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const TableSearch = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (value: string) => {
    const query = params.get('query') || '';

    if (query === value) return;

    router.replace(`${pathname}?query=${value}`);
  };

  return <Search onChange={e => handleSearch(e.target.value)} placeholder="Find category" />;
};
