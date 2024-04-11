'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';
import { SORT_BY } from '@/interfaces/enums';

{
  /*
const useSearchQueryHook = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );

  const [inputValue, setInputValue] = useState(
    searchParams.get('search') || '',
  );
  const debouncedValue = useDebounce(inputValue, 500);

  const [perPage, setPerPage] = useState(
    Number(searchParams.get('per_page')) || 12,
  );

  const [sortBy, setSortBy] = useState<SORT_BY>(
    (searchParams.get('sort_by') as SORT_BY) || SORT_BY.DECREASE_DATE,
  );

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const handlePaginationItemClick = useCallback(
    (page: number) => {
      setCurrentPage(page);
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const handlePerPageClick = useCallback(
    (value: number) => {
      if (value === 12) {
        params.delete('per_page');
      } else {
        params.set('per_page', value.toString());
      }
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [params, pathname, router],
  );

  const handleSortByClick = useCallback(
    (value: string) => {
      if (value === '-pubDate') {
        params.delete('sort_by');
      } else {
        params.set('sort_by', value);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [params, pathname, router],
  );

  useEffect(() => {
    handlePerPageClick(perPage);
  }, [perPage]);

  useEffect(() => {
    handleSortByClick(sortBy);
  }, [sortBy]);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  const handleInputChange = useCallback(
    (value: string) => {
      if (value === '') {
        params.delete('search');
      } else {
        params.set('search', value);
      }
      params.delete('page');
      router.push(`${pathname}?${params}`);
    },
    [debouncedValue],
  );

  useEffect(() => {
    handleInputChange(debouncedValue);
  }, [debouncedValue, handleInputChange]);

  return {
    sortBy,
    setSortBy,
    currentPage,
    handlePaginationItemClick,
    inputValue,
    setInputValue,
    perPage,
    setPerPage,
  };
};
*/
}

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

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchState.currentPage !== 1) {
      params.set('page', searchState.currentPage.toString());
    }

    if (searchState.inputValue !== '') {
      params.set('search', searchState.inputValue);
    }

    if (searchState.perPage !== 12) {
      params.set('per_page', searchState.perPage.toString());
    }

    if (searchState.sortBy !== SORT_BY.DECREASE_DATE) {
      params.set('sort_by', searchState.sortBy);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [searchState]);

  return {
    ...searchState,
    setSearchState,
  };
};

export { useSearchQueryHook };
