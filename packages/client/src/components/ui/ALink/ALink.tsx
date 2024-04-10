import { FC } from 'react';
import cn from 'classnames';

import data from '@/data/data.json';
import { TCasualLink } from '~/types/components.types';

const { readMore } = data;

export const ALink: FC<TCasualLink> = ({
  children = readMore,
  className,
  ...props
}) => {
  return (
    <a
      className={cn(
        'inline-flex w-fit p-1.5 rounded-sm text-accent hover:bg-blue-200 focus:bg-blue-200 active:bg-blue-300 transition-all duration-300 ease-in-out',
        className,
      )}
      {...props}
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      {children}
    </a>
  );
};
