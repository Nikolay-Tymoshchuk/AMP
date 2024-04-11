'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useAxiosAuth } from './useAxiosAuth';

import { KEYS } from '@/interfaces/enums';
import {
  ArticleDTO,
  IAllArticlesResponse,
  ISingleArticleResponse,
} from '@/interfaces/article.interfaces';

const { ARTICLES } = KEYS;

const useGetArticles = () => {
  const params = useSearchParams();
  const searchParams = params ? params.toString() : null;

  const baseApi = useAxiosAuth();

  const getArticles = async (
    params: string | null,
  ): Promise<IAllArticlesResponse> => {
    const url = params ? `${ARTICLES}?${params}` : ARTICLES;
    const response = await baseApi.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: [ARTICLES, searchParams],
    queryFn: () => getArticles(searchParams),
  });
};

const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  const baseApi = useAxiosAuth();

  const updateArticle = async (data: {
    id: string;
    articleData: ArticleDTO;
  }): Promise<ISingleArticleResponse> => {
    const { id, articleData } = data;
    const url = `${ARTICLES}/${id}`;
    const response = await baseApi.put(url, articleData);
    return response.data;
  };

  return useMutation({
    mutationFn: updateArticle,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [ARTICLES] }),
  });
};

const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const baseApi = useAxiosAuth();

  const deleteArticle = async (id: string): Promise<ISingleArticleResponse> => {
    const url = `${ARTICLES}/${id}`;
    const response = await baseApi.delete(url);
    return response.data;
  };

  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [ARTICLES] }),
  });
};

export { useGetArticles, useUpdateArticle, useDeleteArticle };
