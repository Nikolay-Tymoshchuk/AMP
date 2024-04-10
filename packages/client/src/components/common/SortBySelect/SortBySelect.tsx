'use client';

import { ISortBySelectProps } from '@/interfaces/components.interfaces';
import { SORT_BY } from '@/interfaces/enums';
import data from '@/data/data.json';

const {
  decreaseTitle,
  decreaseDate,
  increaseTitle,
  increaseDate,
  sortBy: sortByData,
} = data;

const sortOptions = [
  { value: SORT_BY.DECREASE_DATE, label: decreaseDate },
  { value: SORT_BY.INCREASE_DATE, label: increaseDate },
  { value: SORT_BY.INCREASE_TITLE, label: increaseTitle },
  { value: SORT_BY.DECREASE_TITLE, label: decreaseTitle },
];

export const SortBySelect = ({ sortBy, setSortBy }: ISortBySelectProps) => {
  return (
    <select
      value={sortBy}
      onChange={e => {
        setSortBy(e.target.value);
      }}
      className="border p-0.5 rounded border-darkBlue !outline-none !bg-gray-100 h-[30px] text-xs px-2"
    >
      {sortOptions.map(option => (
        <option key={option.label} value={option.value}>
          {sortByData} {option.label}
        </option>
      ))}
    </select>
  );
};
