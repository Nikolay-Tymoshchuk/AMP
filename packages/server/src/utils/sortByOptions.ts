import { SORT_BY } from '@/interfaces/articles.interface';
import { SortOrder } from 'mongoose';

export const sortByOptions = (value: SORT_BY): Record<string, SortOrder> => {
  switch (value) {
    case SORT_BY.DECREASE_TITLE:
      return { title: -1 };
    case SORT_BY.INCREASE_TITLE:
      return { title: +1 };
    case SORT_BY.INCREASE_DATE:
      return { pubDate: +1 };
    default:
      return { pubDate: -1 };
  }
};
