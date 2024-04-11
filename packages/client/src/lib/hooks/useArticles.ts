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

const useGetArticles = () => {
  const params = useSearchParams();
  const searchParams = params ? params.toString() : null;

  return useQuery([ARTICLES, searchParams], () => getArticles(searchParams), {
    keepPreviousData: false,
    retry: 2,
    retryDelay: 2000,
    refetchOnWindowFocus: false,
  });
};

const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation(updateArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(ARTICLES);
    },
  });
};

const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(ARTICLES);
    },
  });
};

export { useGetArticles, useUpdateArticle, useDeleteArticle };
