'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';
import { SORT_BY } from '@/interfaces/enums';

const useSearchQueryHook = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchState, setSearchState] = useState({
    currentPage: Number(searchParams.get('page')) || 1,
    inputValue: searchParams.get('search') || '',
    perPage: Number(searchParams.get('per_page')) || 12,
    sortBy: (searchParams.get('sort_by') as SORT_BY) || SORT_BY.DECREASE_DATE,
  });

  const debouncedInputValue = useDebounce(searchState.inputValue, 500);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchState.currentPage !== 1) {
      params.set('page', searchState.currentPage.toString());
    }

    if (debouncedInputValue !== '') {
      params.set('search', debouncedInputValue);
    }

    if (searchState.perPage !== 12) {
      params.set('per_page', searchState.perPage.toString());
    }

    if (searchState.sortBy !== SORT_BY.DECREASE_DATE) {
      params.set('sort_by', searchState.sortBy);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [searchState, debouncedInputValue]);

  return {
    ...searchState,
    setSearchState,
  };
};

export { useSearchQueryHook };
