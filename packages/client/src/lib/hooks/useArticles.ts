'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  deleteArticle,
  // getArticleById,
  getArticles,
  updateArticle,
} from '@/lib/features/articlesApi';

import { KEYS } from '@/interfaces/enums';

const { ARTICLES } = KEYS;

export const useArticles = () => {
  const queryClient = useQueryClient();
  const params = useSearchParams();

  const searchParams = params ? params.toString() : null;

  return {
    useGetArticles: () =>
      useQuery([ARTICLES, searchParams], () => getArticles(searchParams), {
        keepPreviousData: true,
        retry: 2,
        retryDelay: 2000,
        refetchOnWindowFocus: false,
      }),

    // LABEL: currently unnecessary
    // useGetArticleById: (id: string) =>
    //   useQuery([ARTICLES, id], () => getArticleById(id)),

    useUpdateArticle: () =>
      useMutation(updateArticle, {
        onSuccess: () => {
          queryClient.invalidateQueries(ARTICLES);
        },
      }),

    useDeleteArticle: () =>
      useMutation(deleteArticle, {
        onSuccess: () => {
          queryClient.invalidateQueries(ARTICLES);
        },
      }),
  };
};
