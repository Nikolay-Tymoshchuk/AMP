import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { SVG_ARROW_CASUAL_LEFT_12_10 } from '@/components/ui/Icons';

import s from './TextBtnNavLink.module.css';

export interface ITextBtnNavLinkProps {
  path: string;
  textLink: string;
  textBeforeLink?: string;
  arrow?: boolean;
  textSize?: '12' | '14';
  fontWeightText?: '300' | '600';
  fontWeightLink?: '400' | '600';
  color?: 'blue' | 'black';
  underlineLink?: boolean;
  classNameText?: string;
  classNameLink?: string;
}

export const TextBtnNavLink: FC<ITextBtnNavLinkProps> = ({
  textBeforeLink,
  path,
  textLink,
  textSize,
  fontWeightText,
  fontWeightLink,
  arrow = false,
  color,
  underlineLink = false,
  classNameText,
  classNameLink,
}) => {
  return (
    <Link
      href={path}
      className={cn(
        s.text,
        {
          [s.textColorBlue]: color === 'blue',
          [s.textColorBlack]: color === 'black',
          [s.textSizeXS]: textSize === '12',
          [s.textSizeSM]: textSize === '14',
          [s.textFontRegular]: fontWeightText === '300',
          [s.textFontSemiBold]: fontWeightText === '600',
        },
        classNameText,
      )}
    >
      {arrow && (
        <SVG_ARROW_CASUAL_LEFT_12_10
          width={12}
          height={10}
          className={s.arrowSvg}
        />
      )}
      {textBeforeLink}
      <span
        className={cn(
          {
            [s.textLinkFontRegular]: fontWeightLink === '400',
            [s.textLinkFontSemiBold]: fontWeightLink === '600',
            [s.textLinkUnderline]: underlineLink,
            [s.indentText]: classNameText,
          },
          classNameLink,
        )}
      >
        {textLink}
      </span>
    </Link>
  );
};
