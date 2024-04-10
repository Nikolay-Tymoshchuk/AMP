import React, { FC } from 'react';
import { ArticleCard } from '@/components/cards/ArticleCard';

import { IArticle } from '@/interfaces/article.interfaces';

export const ArticlesList: FC<{ articles: IArticle[] }> = ({ articles }) => {
  return (
    <ul className="grid auto-rows-[1fr] smOnly:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-3 lg:gap-5 h-fit max-w-full">
      {articles.map(article => (
        <li key={article._id} className="max-w-full">
          <ArticleCard {...article} />
        </li>
      ))}
    </ul>
  );
};
