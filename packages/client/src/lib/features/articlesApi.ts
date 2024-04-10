import baseApi from '../baseApi';

import {
  ArticleDTO,
  IAllArticlesResponse,
  ISingleArticleResponse,
} from '@/interfaces/article.interfaces';
import { ROUTES } from '@/interfaces/enums';

const { ARTICLES } = ROUTES;

export const getArticles = async (
  params: string | null,
): Promise<IAllArticlesResponse> => {
  const url = params ? `${ARTICLES}?${params}` : ARTICLES;
  const response = await baseApi.get(url);
  return response.data;
};

export const getArticleById = async (
  id: string,
): Promise<ISingleArticleResponse> => {
  const url = `${ARTICLES}/${id}`;
  const response = await baseApi.get(url);
  return response.data;
};

export const updateArticle = async (data: {
  id: string;
  articleData: ArticleDTO;
}): Promise<ISingleArticleResponse> => {
  const { id, articleData } = data;
  const url = `${ARTICLES}/${id}`;
  const response = await baseApi.put(url, articleData);
  return response.data;
};

export const deleteArticle = async (
  id: string,
): Promise<ISingleArticleResponse> => {
  const url = `${ARTICLES}/${id}`;
  const response = await baseApi.delete(url);
  return response.data;
};
