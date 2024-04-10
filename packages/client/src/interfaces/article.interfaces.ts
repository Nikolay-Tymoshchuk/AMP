export enum ArticleResponseMessage {
  SINGLE_ARTICLE = 'singleArticle',
  UPDATED = 'updated',
  DELETED = 'deleted',
  CREATED = 'created',
}

export interface IArticle {
  _id: string;
  title: string;
  link: string;
  pubDate: string;
  guid: string;
  description: string;
  enclosureUrl: string | null | undefined;
  enclosureType: string | null | undefined;
}

export interface ArticleDTO {
  title?: string;
  link?: string;
  pubDate?: string;
  guid?: string;
  description?: string;
  enclosureUrl?: string | null;
  enclosureType?: string | null;
}

export interface IArticleMeta {
  page: number;
  per_page: number;
  search: string;
  totalCount: number;
  totalPages: number;
}

export interface IArticleState {
  articles: IArticle[] | null;
  meta: IArticleMeta | null;
}

export interface IArticleResponse {
  status: boolean;
  message: ArticleResponseMessage;
}

export interface IArticlesSearchQuery {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface IAllArticlesResponse extends IArticleResponse {
  data: IArticle[];
  meta: IArticleMeta;
}

export interface ISingleArticleResponse extends IArticleResponse {
  data: IArticle;
}

export interface ArticleTag {
  type: 'Articles';
  id: string;
}

export interface IUpdateArticle {
  id: string;
  articleData: ArticleDTO;
}
