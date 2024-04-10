import { sortByOptions } from '@/utils/sortByOptions';
import { ArticleDto } from '@dtos/articles.dto';
import { HttpException } from '@exceptions/HttpException';
import { Article, SORT_BY } from '@interfaces/articles.interface';
import articleModel from '@models/articles.model';
import { isEmpty } from '@utils/util';

class ArticleService {
  public articles = articleModel;

  public async findAllArticles(page: number, limit: number, search: string, sort_by: SORT_BY): Promise<Article[]> {
    const skip: number = (page - 1) * limit;
    const query = search ? { title: { $regex: search, $options: 'i' } } : {};
    const sortBy = sortByOptions(sort_by);
    const articles: Article[] = await this.articles.find(query).skip(skip).limit(limit).sort(sortBy);
    return articles;
  }

  public async countArticles(search: string): Promise<number> {
    const query = search ? { title: { $regex: search, $options: 'i' } } : {};
    const count: number = await this.articles.countDocuments(query);
    return count;
  }

  public async findArticleById(articleId: string): Promise<Article> {
    if (isEmpty(articleId)) throw new HttpException(400, 'ArticleId is empty');

    const findArticle: Article = await this.articles.findOne({
      _id: articleId,
    });
    if (!findArticle) throw new HttpException(409, "Article doesn't exist");

    return findArticle;
  }

  public async createArticle(articleData: ArticleDto): Promise<Article> {
    if (isEmpty(articleData)) throw new HttpException(400, 'articleData is empty');

    const findArticle: Article = await this.articles.findOne({
      link: articleData.link,
    });
    if (findArticle) throw new HttpException(409, 'Article already exists');

    const createArticleData: Article = await this.articles.create({
      ...articleData,
      pubDate: new Date(articleData.pubDate),
    });

    return createArticleData;
  }

  public async updateArticle(articleId: string, articleData: ArticleDto): Promise<Article> {
    if (isEmpty(articleData)) throw new HttpException(400, 'articleData is empty');

    if (articleData.link) {
      const findArticle: Article = await this.articles.findOne({
        link: articleData.link,
      });
      if (findArticle && findArticle._id != articleId) throw new HttpException(409, `Article with link ${articleData.link} already exists`);
    }

    const updateArticleById: Article = await this.articles.findByIdAndUpdate(
      articleId,
      {
        ...articleData,
      },
      {
        returnDocument: 'after',
      },
    );
    if (!updateArticleById) throw new HttpException(409, "Article doesn't exist");

    return updateArticleById;
  }

  public async deleteArticle(articleId: string): Promise<Article> {
    const deleteArticleById: Article = await this.articles.findByIdAndDelete(articleId);

    if (!deleteArticleById) throw new HttpException(409, "Article doesn't exist");

    return deleteArticleById;
  }
}

export default ArticleService;
