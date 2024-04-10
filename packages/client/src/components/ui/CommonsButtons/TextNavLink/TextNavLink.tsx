import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';

export interface ITextNavLinkProps {
  path: string;
  textLink: string;
  textBeforeLink?: string;
  fontBoldLink?: boolean;
  color?: 'blue' | 'black';
  underlineLink?: boolean;
  classNameText?: string;
  classNameLink?: string;
}

export const TextNavLink: FC<ITextNavLinkProps> = ({
  textBeforeLink,
  path,
  textLink,
  fontBoldLink,
  color,
  underlineLink = false,
  classNameText,
  classNameLink,
}) => {
  return (
    <p
      className={cn(
        'font-light text-base',
        {
          'text-accentLight': color === 'blue',
          'text-textDark': color === 'black',
        },
        classNameText,
      )}
    >
      {textBeforeLink}{' '}
      <Link
        href={path}
        className={cn(
          'hover:text-accent transition duration-300 pl-1',
          {
            'font-semibold': fontBoldLink,
            'underline underline-offset-[3px]': underlineLink,
          },
          classNameLink,
        )}
      >
        {textLink}
      </Link>
    </p>
  );
};
