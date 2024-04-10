'use client';

import { ItemsOnPageSelectProps } from '@/interfaces/components.interfaces';
import data from '@/data/data.json';

const { show } = data;

export const PerPageSelect = ({
  perPage,
  onPerPageClick,
}: ItemsOnPageSelectProps) => {
  return (
    <select
      value={perPage}
      onChange={e => {
        onPerPageClick(Number(e.target.value));
      }}
      className="border p-0.5 rounded border-darkBlue !outline-none !bg-gray-100 h-[30px] text-xs px-2"
    >
      {[12, 24, 36, 48].map(pageSize => (
        <option key={pageSize} value={pageSize}>
          {show} {pageSize}
        </option>
      ))}
    </select>
  );
};
