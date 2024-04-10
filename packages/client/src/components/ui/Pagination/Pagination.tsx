'use client';
import { memo } from 'react';

import { useSearchQueryHook } from '@/hooks';
import { getPaginationItems } from '@/utils/getPaginationItems';
import {
  SVG_ARROW_LEFT_12_12,
  SVG_ARROW_RIGHT_12_12,
} from '@/components/ui/Icons';

import { PaginationBtn } from './PaginationBtn';

import s from './Pagination.module.css';

type PaginationProps = {
  // currentPage: number;
  lastPage: number;
  maxLength: number;
  // setCurrentPage: Dispatch<SetStateAction<number>>;
};
export const Pagination = memo((props: PaginationProps) => {
  const { lastPage, maxLength } = props;

  const { currentPage, handlePaginationItemClick } = useSearchQueryHook();

  // useEffect(() => {
  //   handlePaginationItemClick();
  // }, [currentPage]);

  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <nav className={s.paginationContainer} aria-label="Pagination">
      <PaginationBtn
        disabled={currentPage === 1}
        onClick={() => handlePaginationItemClick(currentPage - 1)}
        className={s.optionBtn}
      >
        <SVG_ARROW_LEFT_12_12 width={12} height={12} />
      </PaginationBtn>
      <div className={s.pagination}>
        {pageNums.map((pageNum, idx) => (
          <PaginationBtn
            key={idx}
            active={currentPage === pageNum}
            disabled={isNaN(pageNum)}
            onClick={() => handlePaginationItemClick(pageNum)}
          >
            {!isNaN(pageNum) ? pageNum : '...'}
          </PaginationBtn>
        ))}
      </div>
      <PaginationBtn
        disabled={currentPage === lastPage}
        onClick={() => handlePaginationItemClick(currentPage + 1)}
        className={s.optionBtn}
      >
        <SVG_ARROW_RIGHT_12_12 width={12} height={12} />
      </PaginationBtn>
    </nav>
  );
});

Pagination.displayName = 'Pagination';
