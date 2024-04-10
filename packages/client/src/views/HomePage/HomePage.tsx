'use client';
import { useMemo } from 'react';

import { useArticles } from '@/lib/hooks/useArticles';
import { useSearchQueryHook } from '@/hooks';

import { ArticlesList } from '@/components/common/ArticlesList';
import { Pagination } from '@/components/ui/Pagination';
import { PerPageSelect } from '@/components/common/PerPageSelect';
import { Spinner } from '@/components/ui/Spinner';
import { ItemsOnPageInfo } from '@/components/common/ItemsOnPageInfo';
import { InputSearchWithBox } from '@/components/common/InputSearchWithBox';
import { SortBySelect } from '@/components/common/SortBySelect';

import data from '@/data/data.json';
import { IArticle } from '@/interfaces/article.interfaces';

const { listIsEmpty, errorFetchingData } = data;

export const HomePage = () => {
  const { useGetArticles } = useArticles();
  const { data: articlesResponse, isLoading, isError } = useGetArticles();
  const { setPerPage, perPage, inputValue, setInputValue, sortBy, setSortBy } =
    useSearchQueryHook();

  const articleData: {
    list: IArticle[];
    totalCount: number;
    totalPages: number;
  } = useMemo(() => {
    if (!articlesResponse) {
      return {
        list: [],
        totalCount: 0,
        totalPages: 0,
      };
    }

    const {
      data: list,
      meta: { totalCount, totalPages },
    } = articlesResponse;
    return { list, totalCount, totalPages };
  }, [articlesResponse]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {isError ? (
            <p>{errorFetchingData}</p>
          ) : (
            <section className="flex flex-col gap-y-8 min-h-[50vh]">
              <div className="lg:flex lg:justify-between lg:items-center items-end grid grid-cols-2 grid-rows-2 gap-2 py-4 px-1 md:px-4 bg-blue-100">
                <PerPageSelect perPage={perPage} onPerPageClick={setPerPage} />
                <SortBySelect sortBy={sortBy} setSortBy={setSortBy} />
                <InputSearchWithBox
                  value={inputValue}
                  setValue={setInputValue}
                />
                <ItemsOnPageInfo
                  length={articleData?.list?.length}
                  total={articleData.totalCount}
                />
              </div>
              {articleData?.list?.length === 0 ? (
                <p>{listIsEmpty}</p>
              ) : (
                <>
                  <ArticlesList articles={articleData.list} />
                  <Pagination lastPage={articleData.totalPages} maxLength={7} />
                </>
              )}
            </section>
          )}
        </>
      )}
    </>
  );
};
