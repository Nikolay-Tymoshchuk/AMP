import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames';

import {
  SVG_RADIO_CHECKED_24_24,
  SVG_RADIO_UNCHECKED_24_24,
  SVG_CHECK_MARK_11_8,
} from '@/components/ui/Icons';

import s from './RadioInput.module.css';

export interface IRadioInputProps {
  labelText: string;
  value: string;
  labelGap?: '20px' | '24px';
  fontSize?: '16px' | '18px';
  isRegularFont?: boolean;
  classNameLabel?: string;
  watchValue?: string | object | undefined;
  shapeRadio?: 'circle' | 'square';
  register?: UseFormRegisterReturn;
  error?: string;
  id?: string;
}

export const RadioInput: FC<IRadioInputProps> = ({
  labelText,
  register,
  value = '',
  shapeRadio = 'square',
  labelGap = '20px',
  isRegularFont,
  classNameLabel,
  watchValue,
  fontSize = '16px',
  error,
  id,
}) => {
  const finalRadioLabelClassName = cn(
    s.radioLabel,
    {
      [s.radioLabelSmallGap]: labelGap === '20px',
      [s.radioLabelLargeGap]: labelGap === '24px',
      [s.radioLabelFontWeight]: isRegularFont,
      [s.radioLabelFontSizeSmall]: fontSize === '16px',
      [s.radioLabelFontSizeLarge]: fontSize === '18px',
    },
    classNameLabel,
  );
  return (
    <label className={finalRadioLabelClassName}>
      <input
        type="radio"
        {...register}
        value={value}
        className="hidden"
        id={id}
      />

      {shapeRadio === 'circle' && (
        <div className={s.radioCircleWrapper}>
          {value === watchValue ? (
            <SVG_RADIO_CHECKED_24_24 width={24} height={24} />
          ) : (
            <SVG_RADIO_UNCHECKED_24_24 width={24} height={24} />
          )}
        </div>
      )}

      {shapeRadio === 'square' && (
        <div
          className={cn(s.radioSquareWrapper, {
            [s.radioSquareWrapperError]: error,
          })}
        >
          {value === watchValue && (
            <SVG_CHECK_MARK_11_8 width={11} height={8} />
          )}
        </div>
      )}

      {labelText}
    </label>
  );
};
