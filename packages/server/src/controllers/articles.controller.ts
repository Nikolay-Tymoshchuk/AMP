import articleService from '@/services/articles.service';
import { ArticleDto } from '@dtos/articles.dto';
import { Article, SORT_BY } from '@interfaces/articles.interface';
import { NextFunction, Request, Response } from 'express';

class ArticlesController {
  public articleService = new articleService();

  public getArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const per_page = req.query.per_page ? parseInt(req.query.per_page as string) : 12;
      const search = req.query.search ? (req.query.search as string) : '';
      const sort_by = req.query.sort_by ? (req.query.sort_by as SORT_BY) : SORT_BY.DECREASE_DATE;

      const findAllArticlesData: Article[] = await this.articleService.findAllArticles(page, per_page, search, sort_by);
      const totalCount = await this.articleService.countArticles(search);

      res.status(200).json({
        data: findAllArticlesData,
        meta: {
          page,
          per_page,
          search,
          totalCount,
          totalPages: Math.ceil(totalCount / per_page),
        },
        message: 'allArticles',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getArticleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articleId: string = req.params.id;
      const findOneArticleData: Article = await this.articleService.findArticleById(articleId);

      res.status(200).json({
        data: findOneArticleData,
        message: 'singleArticle',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public createArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articleData: ArticleDto = req.body;
      const createArticleData: Article = await this.articleService.createArticle(articleData);

      res.status(201).json({ data: createArticleData, message: 'created', success: true });
    } catch (error) {
      next(error);
    }
  };

  public updateArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articleId: string = req.params.id;
      const articleData: ArticleDto = req.body;
      const updateArticleData: Article = await this.articleService.updateArticle(articleId, articleData);

      res.status(200).json({ data: updateArticleData, message: 'updated', success: true });
    } catch (error) {
      next(error);
    }
  };

  public deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articleId: string = req.params.id;
      const deleteArticleData: Article = await this.articleService.deleteArticle(articleId);

      res.status(200).json({ data: deleteArticleData, message: 'deleted', success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default ArticlesController;
