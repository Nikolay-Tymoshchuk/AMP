import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import ArticlesRoute from './routes/articles.route';
import RssParserService from './services/rss-parser.service';
import { RSS_FEED_URL } from '@config';

validateEnv();

new RssParserService(RSS_FEED_URL);

const app = new App([new IndexRoute(), new AuthRoute(), new ArticlesRoute()]);

app.listen();
