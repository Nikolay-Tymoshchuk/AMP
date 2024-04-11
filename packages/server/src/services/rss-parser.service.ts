import Parser from 'rss-parser';
import cron from 'node-cron';
import Article from '@models/articles.model';

class RssParserService {
  private parser: Parser;
  public url: string;

  constructor(rssUrl: string) {
    this.url = rssUrl;
    this.parser = new Parser();
    this.initializeScheduledParsing();
  }

  private async parseRSSFeed(feedUrl: string) {
    try {
      const feed = await this.parser.parseURL(feedUrl);

      const promises = feed.items.map(async item => {
        const existingArticle = await Article.findOne({ link: item.link });
        const {
          title = '-',
          contentSnippet = '-',
          link = '-',
          pubDate = new Date(),
          guid = '-',
          enclosure: { url = null, type = null },
        } = item;

        if (!existingArticle) {
          const newArticle = new Article({
            title,
            description: contentSnippet,
            link,
            pubDate,
            guid,
            enclosureUrl: url,
            enclosureType: type,
          });

          await newArticle.save();
          console.log(`Saved new article: ${item.title}`);
        } else {
          console.log(`Article already exists: ${item.title}`);
        }
      });

      await Promise.all(promises);
    } catch (error) {
      console.error(`Error parsing RSS feed: ${error}`);
    }
  }

  private initializeScheduledParsing() {
    cron.schedule('0 * * * *', () => {
      this.parseRSSFeed(this.url);
    });
  }
}

export default RssParserService;
