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
import { Header } from '@/layout/Header';
import { Hero } from '@/layout/Hero';

import { IArticle } from '@/interfaces/article.interfaces';
import { IPrimaryLayout } from '@/interfaces/components.interfaces';
import { SORT_BY } from '@/interfaces/enums';
import data from '@/data/data.json';

const { errorFetchingData } = data;

export const PrimaryLayout = ({
  children,
  withHero,
  title,
}: IPrimaryLayout) => {
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
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between py-10 md:pt-14 lg:py-18 gap-y-5 md:gap-y-10">
        {withHero && <Hero />}
        <div className="container flex-1">
          <section className="flex flex-col gap-y-8 min-h-[50vh]">
            {
              <>
                {isError ? (
                  <Title>{errorFetchingData}</Title>
                ) : (
                  <>
                    {title && <Title>{title}</Title>}
                    <div className="lg:flex lg:justify-between lg:items-center items-end grid grid-cols-2 grid-rows-2 gap-2 py-4 px-1 md:px-4 bg-blue-100">
                      <PerPageSelect
                        perPage={perPage}
                        onPerPageClick={handlePerPageClick}
                      />
                      <SortBySelect sortBy={sortBy} setSortBy={handleSortBy} />
                      <InputSearchWithBox
                        value={inputValue}
                        setValue={handleSearch}
                      />
                      <ItemsOnPageInfo
                        length={articleData?.list?.length}
                        total={articleData.totalCount}
                      />
                    </div>
                    {isLoading ? (
                      <div>
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        {children}
                        <Pagination
                          lastPage={totalPages}
                          maxLength={7}
                          current={currentPage}
                          setPage={handlePaginationItemClick}
                        />
                      </>
                    )}
                  </>
                )}
              </>
            }
          </section>
        </div>
      </main>
    </>
  );
};
