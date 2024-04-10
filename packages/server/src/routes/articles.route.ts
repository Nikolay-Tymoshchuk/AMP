import authMiddleware from '@/middlewares/auth.middleware';
import ArticlesController from '@controllers/articles.controller';
import { ArticleDto } from '@dtos/articles.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class ArticlesRoute implements Routes {
  public path = '/articles';
  public router = Router();
  public articlesController = new ArticlesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.articlesController.getArticles);
    this.router.get(`${this.path}/:id`, this.articlesController.getArticleById);
    this.router.post(`${this.path}`, validationMiddleware(ArticleDto, 'body'), this.articlesController.createArticle);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(ArticleDto, 'body', true), this.articlesController.updateArticle);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.articlesController.deleteArticle);
  }
}

export default ArticlesRoute;
