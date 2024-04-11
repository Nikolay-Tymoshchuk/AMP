'use client';
import { useMemo, useState } from 'react';

import { useSearchQueryHook } from '@/hooks';
import { useGetArticles } from '@/lib/hooks/useArticles';

import { InputSearchWithBox } from '@/components/common/InputSearchWithBox';
import { ItemsOnPageInfo } from '@/components/common/ItemsOnPageInfo';
import { PerPageSelect } from '@/components/common/PerPageSelect';
import { SortBySelect } from '@/components/common/SortBySelect';
import { Pagination } from '@/components/ui/Pagination';
import { Spinner } from '@/components/ui/Spinner';
import { Title } from '@/components/ui/Title';

import { IArticle } from '@/interfaces/article.interfaces';
import { IPrimaryLayoutClient } from '@/interfaces/components.interfaces';
import { SORT_BY } from '@/interfaces/enums';
import data from '@/data/data.json';

const { errorFetchingData } = data;

export const PrimaryLayoutClient = ({
  children,
  title,
}: IPrimaryLayoutClient) => {
  const { data: articlesResponse, isLoading, isError } = useGetArticles();
  const { inputValue, perPage, setSearchState, sortBy, currentPage } =
    useSearchQueryHook();

  const [totalPages, setTotalPages] = useState(
    articlesResponse?.meta.totalPages || 1,
  );

  const handlePerPageClick = (value: number) => {
    setSearchState(prev => {
      return { ...prev, perPage: value, currentPage: 1 };
    });
  };

  const handleSearch = (value: string) => {
    setSearchState(prev => {
      return { ...prev, inputValue: value, currentPage: 1 };
    });
  };

  const handleSortBy = (value: SORT_BY) => {
    setSearchState(prev => {
      return { ...prev, sortBy: value, currentPage: 1 };
    });
  };

  const handlePaginationItemClick = (page: number) => {
    setSearchState(prev => ({ ...prev, currentPage: page }));
  };

  const articleData: {
    list: IArticle[];
    totalCount: number;
  } = useMemo(() => {
    if (!articlesResponse) {
      return {
        list: [],
        totalCount: 0,
      };
    }
    const {
      data: list,
      meta: { totalCount, totalPages: responseTotalPages },
    } = articlesResponse;

    if (totalPages !== responseTotalPages) {
      setTotalPages(responseTotalPages);
    }

    return { list, totalCount };
  }, [articlesResponse, totalPages]);

  return (
    <>
      {title && <Title>{title}</Title>}
      <div className="lg:flex lg:justify-between lg:items-center items-end grid grid-cols-2 grid-rows-2 gap-2 py-4 px-1 md:px-4 bg-blue-100">
        <PerPageSelect perPage={perPage} onPerPageClick={handlePerPageClick} />
        <SortBySelect sortBy={sortBy} setSortBy={handleSortBy} />
        <InputSearchWithBox value={inputValue} setValue={handleSearch} />
        <ItemsOnPageInfo
          length={articleData?.list?.length}
          total={articleData.totalCount}
        />
      </div>
      {children}
      <Pagination
        lastPage={totalPages}
        maxLength={7}
        current={currentPage}
        setPage={handlePaginationItemClick}
      />
    </>
  );
};
