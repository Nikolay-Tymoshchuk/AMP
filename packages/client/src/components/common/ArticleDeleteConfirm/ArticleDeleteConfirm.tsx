import { FC } from 'react';
import { toast } from 'react-toastify';

import { useDeleteArticle } from '@/lib/hooks/useArticles';

import { Button } from '@/components/ui/CommonsButtons/Button';
import { Title } from '@/components/ui/Title';

import { TVoidFunction } from '~/types/components.types';
import data from '@/data/data.json';

const {
  deleteArticleApprove,
  deleteArticle,
  deleteArticleCancel,
  successDeleteArticle,
  errorDeleteArticle,
} = data;

interface IGoogleInfoModalProps {
  articleId: string;
  closeModal: TVoidFunction;
}

export const ArticleDeleteConfirm: FC<IGoogleInfoModalProps> = ({
  articleId,
  closeModal,
}) => {
  const { mutateAsync } = useDeleteArticle();

  const handleDeleteArticle = async () => {
    try {
      await mutateAsync(articleId);
      toast.success(successDeleteArticle);
      closeModal();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error(errorDeleteArticle);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <Title Tag="h2" className="mt-8 text-center">
        {deleteArticle}
      </Title>

      <div className="grid grid-cols-2 gap-4">
        <Button text={deleteArticleCancel} type="button" onClick={closeModal} />
        <Button
          text={deleteArticleApprove}
          type="button"
          onClick={handleDeleteArticle}
        />
      </div>
    </div>
  );
};
