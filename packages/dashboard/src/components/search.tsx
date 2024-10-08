'use client';

import { useDebounce } from '@/hooks';
import AntSearch, { type SearchProps as AntSearchProps } from 'antd/es/input/Search';
import SkeletonInput from 'antd/es/skeleton/Input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type SearchProps = Omit<AntSearchProps, 'onChange'>;

const SearchComponent: React.FC<SearchProps> = props => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebounce(searchTerm => {
    const prevSearchTerm = params.get('search') || '';

    if (prevSearchTerm === searchTerm) return;

    router.replace(`${pathname}?search=${searchTerm}`);
  }, 500);

  const defaultValue = params.get('search') || '';
  return (
    <AntSearch
      allowClear
      defaultValue={defaultValue}
      onChange={e => handleSearch(e.target.value)}
      placeholder="Search"
      {...props}
    />
  );
};

export const Search: React.FC<SearchProps> = props => (
  <Suspense fallback={<SkeletonInput active block />}>
    <SearchComponent {...props} />
  </Suspense>
);
