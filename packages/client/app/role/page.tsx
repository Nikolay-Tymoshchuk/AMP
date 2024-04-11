'use client';
import {
  ArticlesTable,
  ArticlesTableColumns,
} from '@/components/common/ArticlesTable';
import data from '@/data/data.json';
import { useGetArticles } from '@/lib/hooks/useArticles';
import { useAuthHook } from '@/hooks';
import { useState } from 'react';
import { IArticleModalOption } from '@/interfaces/components.interfaces';
import { Modal } from '@/components/ui/Modal';
import { EditArticleForm } from '@/components/forms/EditArticleForm';
import { ArticleDeleteConfirm } from '@/components/common/ArticleDeleteConfirm';

export default function Role() {
  const { data } = useGetArticles();
  const { role } = useAuthHook();

  const articles = data?.data || [];
  const [modalOptions, setModalOptions] = useState<IArticleModalOption | null>(
    null,
  );

  const handleCloseModal = () => setModalOptions(null);
  return (
    <>
      {role && (
        <ArticlesTable
          columns={ArticlesTableColumns(setModalOptions, role)}
          data={articles || []}
        />
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
