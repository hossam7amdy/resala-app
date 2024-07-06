'use client';

import { useDebounce } from '@/hooks';
import AntSearch, { type SearchProps as AntSearchProps } from 'antd/es/input/Search';
import SkeletonInput from 'antd/es/skeleton/Input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface SearchProps extends Omit<AntSearchProps, 'onChange'> {}

const SearchComponent: React.FC<SearchProps> = props => {
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

const Search: React.FC<SearchProps> = props => (
  <Suspense fallback={<SkeletonInput active block />}>
    <SearchComponent {...props} />
  </Suspense>
);

export default Search;
