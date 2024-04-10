import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';
import cn from 'classnames';
import s from './Pagination.module.css';

export type Props = DetailedHTMLProps<
  HtmlHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { active?: boolean; disabled?: boolean };

export function PaginationBtn({
  className,
  active,
  disabled,
  children,
  ...otherProps
}: Props) {
  const customClassName = cn(s.paginationBtn, className, active && s.active);

  return (
    <button
      type="button"
      className={customClassName}
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      {...otherProps}
    >
      {children}
    </button>
  );
}
