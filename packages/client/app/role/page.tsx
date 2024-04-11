'use client';
import {
  ArticlesTable,
  ArticlesTableColumns,
} from '@/components/common/ArticlesTable';
import { useGetArticles } from '@/lib/hooks/useArticles';
import { useAuthHook } from '@/hooks';
import { useState } from 'react';
import { IArticleModalOption } from '@/interfaces/components.interfaces';
import { Modal } from '@/components/ui/Modal';
import { EditArticleForm } from '@/components/forms/EditArticleForm';
import { ArticleDeleteConfirm } from '@/components/common/ArticleDeleteConfirm';
import { Spinner } from '@/components/ui/Spinner';

import data from '@/data/data.json';

const { errorFetchingData } = data;

export default function Role() {
  const { data, isLoading, isError } = useGetArticles();
  const { role } = useAuthHook();

  const articles = data?.data || [];
  const [modalOptions, setModalOptions] = useState<IArticleModalOption | null>(
    null,
  );

  const handleCloseModal = () => setModalOptions(null);

  return (
    <>
      {isLoading ? (
        <div className="py-10 flex items-center justify-center h-[calc(100vh_-_380px)] ">
          <Spinner />
        </div>
      ) : (
        <>
          {isError ? (
            <p>{errorFetchingData}</p>
          ) : (
            <>
              {role && (
                <ArticlesTable
                  columns={ArticlesTableColumns(setModalOptions, role)}
                  data={articles || []}
                />
              )}
            </>
          )}
        </>
      )}

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
    </>
  );
}
