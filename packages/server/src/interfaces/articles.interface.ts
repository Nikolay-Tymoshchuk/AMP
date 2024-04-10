export interface Article {
  _id: string;
  title: string;
  link: string;
  pubDate: Date;
  guid: string;
  description: string;
  enclosureUrl: string;
  enclosureType: string;
}

export enum SORT_BY {
  INCREASE_DATE = 'pubDate',
  DECREASE_DATE = '-pubDate',
  INCREASE_TITLE = 'title',
  DECREASE_TITLE = '-title',
}
