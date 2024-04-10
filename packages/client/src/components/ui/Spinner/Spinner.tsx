import cn from 'classnames';

import { IClassNamesProps } from '@/interfaces/components.interfaces';
import type { FC } from 'react';
import s from './Spinner.module.css';

export const Spinner: FC<IClassNamesProps> = ({ className }) => {
  return <span className={cn(s.loader, className)}></span>;
};
