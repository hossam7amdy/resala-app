'use client';

import { useDebounce } from '@/lib/use-debounce';
import AntSearch, { type SearchProps } from 'antd/es/input/Search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Search = (props: Omit<SearchProps, 'onChange'>) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebounce((value: string) => {
    const query = params.get('query') || '';

    if (query === value) return;

    router.replace(`${pathname}?query=${value}`);
  }, 500);

  return <AntSearch onChange={e => handleSearch(e.target.value)} placeholder="Search" {...props} />;
};
