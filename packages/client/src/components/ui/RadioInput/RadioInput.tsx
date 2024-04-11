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
  watchValue?: string | object | undefined;
  register?: UseFormRegisterReturn;
  error?: string;
  id?: string;
}

export const RadioInput: FC<IRadioInputProps> = ({
  labelText,
  register,
  value = '',
  watchValue,
  error,
  id,
}) => {
  const finalRadioLabelClassName = cn(s.radioLabel);
  return (
    <label className={finalRadioLabelClassName}>
      <input
        type="radio"
        {...register}
        value={value}
        className="hidden"
        id={id}
      />

      <div className={s.radioCircleWrapper}>
        {value === watchValue ? (
          <SVG_RADIO_CHECKED_24_24 width={24} height={24} />
        ) : (
          <SVG_RADIO_UNCHECKED_24_24 width={24} height={24} />
        )}
      </div>

      {labelText}
    </label>
  );
};
