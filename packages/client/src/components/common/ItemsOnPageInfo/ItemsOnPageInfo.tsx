import type { FC } from 'react';
import data from '@/data/data.json';
import type { IItemsOnPage } from '@/interfaces/components.interfaces';

const { itemsOnPage } = data;

export const ItemsOnPageInfo: FC<IItemsOnPage> = ({ length, total }) => {
  return (
    <div>
      <div className="whitespace-nowrap font-medium text-xs md:text-sm text-right">
        <span>{itemsOnPage}:</span>
        <span className="mx-1 text-orange">{length}</span>
        {!!total && total > 1 && (
          <>
            / <span className="text-orange ml-1">{total}</span>
          </>
        )}
      </div>
    </div>
  );
};

ItemsOnPageInfo.displayName = 'ItemsOnPageInfo';
