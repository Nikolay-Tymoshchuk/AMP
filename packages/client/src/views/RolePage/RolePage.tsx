'use client';
import { useMemo, useState } from 'react';

import { useAuthHook, useSearchQueryHook } from '@/hooks';
import { useArticles } from '@/lib/hooks/useArticles';

import {
  ArticlesTable,
  ArticlesTableColumns,
} from '@/components/common/ArticlesTable';
import { InputSearchWithBox } from '@/components/common/InputSearchWithBox';
import { ItemsOnPageInfo } from '@/components/common/ItemsOnPageInfo';
import { PerPageSelect } from '@/components/common/PerPageSelect';
import { SortBySelect } from '@/components/common/SortBySelect';
import { EditArticleForm } from '@/components/forms/EditArticleForm';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';
import { Spinner } from '@/components/ui/Spinner';
import { Title } from '@/components/ui/Title';
import { PrimaryLayout } from '@/layout/PrimaryLayout';

import data from '@/data/data.json';
import { IArticle } from '@/interfaces/article.interfaces';
import { IArticleModalOption } from '@/interfaces/components.interfaces';
import { ArticleDeleteConfirm } from '@/components/common/ArticleDeleteConfirm';

const { errorFetchingData, editPage } = data;

export const RolePage = () => {
  const { useGetArticles } = useArticles();
  const { data: articlesResponse, isLoading, isError } = useGetArticles();
  const { setPerPage, perPage, inputValue, setInputValue, sortBy, setSortBy } =
    useSearchQueryHook();
  const [modalOptions, setModalOptions] = useState<IArticleModalOption | null>(
    null,
  );
  const { role } = useAuthHook();

  const handleCloseModal = () => setModalOptions(null);

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
    <PrimaryLayout>
      <section className="pt-5 md:pt-8 overflow-hidden">
        <Title>{editPage}</Title>
        {isLoading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            {isError ? (
              <p>{errorFetchingData}</p>
            ) : (
              <>
                {role && (
                  <>
                    <div className="lg:flex lg:justify-between lg:items-center items-end grid grid-cols-2 grid-rows-2 gap-2 py-4 px-1 md:px-4 bg-blue-100">
                      <PerPageSelect
                        perPage={perPage}
                        onPerPageClick={setPerPage}
                      />
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
                    <ArticlesTable
                      columns={ArticlesTableColumns(setModalOptions, role)}
                      data={articleData.list}
                    />
                    <Pagination
                      lastPage={articleData.totalPages}
                      maxLength={7}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </section>

      {!!modalOptions && (
        <Modal onClick={handleCloseModal}>
          {modalOptions.mode == 'edit' ? (
            <EditArticleForm
              article={modalOptions.article}
              closeModal={handleCloseModal}
            />
          ) : (
            <ArticleDeleteConfirm
              articleId={modalOptions.article._id}
              closeModal={handleCloseModal}
            />
          )}
        </Modal>
      )}
    </PrimaryLayout>
  );
};
