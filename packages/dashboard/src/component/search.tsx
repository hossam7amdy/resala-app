'use client';

import { useDebounce } from '@/hooks/useDebounce';
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

  const defaultValue = params.get('query') || '';
  return (
    <AntSearch
      defaultValue={defaultValue}
      onChange={e => handleSearch(e.target.value)}
      placeholder="Search"
      {...props}
    />
  );
};

export default Search;
