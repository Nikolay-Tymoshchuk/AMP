'use client';
import { memo } from 'react';

import { getPaginationItems } from '@/utils/getPaginationItems';
import {
  SVG_ARROW_LEFT_12_12,
  SVG_ARROW_RIGHT_12_12,
} from '@/components/ui/Icons';

import { PaginationBtn } from './PaginationBtn';

import s from './Pagination.module.css';
import { IPaginationProps } from '@/interfaces/components.interfaces';

export const Pagination = memo((props: IPaginationProps) => {
  const { lastPage, maxLength, current, setPage } = props;

  const pageNums = getPaginationItems(current, lastPage, maxLength);

  return (
    <nav className={s.paginationContainer} aria-label="Pagination">
      <PaginationBtn
        disabled={current === 1}
        onClick={() => setPage(current - 1)}
        className={s.optionBtn}
      >
        <SVG_ARROW_LEFT_12_12 width={12} height={12} />
      </PaginationBtn>
      <div className={s.pagination}>
        {pageNums.map((pageNum, idx) => (
          <PaginationBtn
            key={idx}
            active={current === pageNum}
            disabled={isNaN(pageNum)}
            onClick={() => setPage(pageNum)}
          >
            {!isNaN(pageNum) ? pageNum : '...'}
          </PaginationBtn>
        ))}
      </div>
      <PaginationBtn
        disabled={current === lastPage}
        onClick={() => setPage(current + 1)}
        className={s.optionBtn}
      >
        <SVG_ARROW_RIGHT_12_12 width={12} height={12} />
      </PaginationBtn>
    </nav>
  );
});

Pagination.displayName = 'Pagination';
