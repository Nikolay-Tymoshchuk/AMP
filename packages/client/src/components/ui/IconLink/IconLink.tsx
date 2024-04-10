import Link, { LinkProps } from 'next/link';
import cn from 'classnames';

import { FC } from 'react';
import { TInnerLink } from '~/types/components.types';

export const IconLink: FC<TInnerLink> = ({ children, className, ...props }) => {
  return (
    <Link {...props} className={cn('', className)}>
      {children}
    </Link>
  );
};
