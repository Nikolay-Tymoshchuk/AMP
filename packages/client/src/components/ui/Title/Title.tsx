import { ReactNode } from 'react';
import cn from 'classnames';

interface IProps {
  Tag?: 'h1' | 'h2';
  children: ReactNode;
  accent?: boolean;
  className?: string;
}

export const Title = ({ Tag = 'h1', children, accent, className }: IProps) => {
  return (
    <Tag
      className={cn(
        'text-center text-textDark font-semibold',
        {
          ['text-32/40 font-semibold md:text-40/56']: Tag === 'h1',
          ['text-18/28 md:text-20/28']: Tag === 'h2',
          ['text-accent']: accent,
        },
        className,
      )}
    >
      {children}
    </Tag>
  );
};
