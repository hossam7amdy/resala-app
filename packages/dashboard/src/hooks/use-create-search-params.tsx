'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useCreateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createSearchParams = (params: Record<string, string | number | boolean>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      newSearchParams.set(key, value.toString());
    });

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return { createSearchParams };
};
