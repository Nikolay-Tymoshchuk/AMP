import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames';

import s from './RadioBtnInput.module.css';

export interface IRadioBtnInputProps {
  labelText: string;
  value: string;
  colorRadio?: 'green' | 'red' | 'blue';
  classNameLabel?: string;
  watchValue?: string | object | undefined;
  register?: UseFormRegisterReturn;
}

export const RadioBtnInput: FC<IRadioBtnInputProps> = ({
  labelText,
  register,
  value = '',
  colorRadio = 'green',
  classNameLabel,
  watchValue,
}) => {
  const finalRadioLabelClassName = cn(
    s.radioBtnLabel,
    {
      [s.radioBtnLabelGreen]: colorRadio === 'green',
      [s.radioBtnLabelRed]: colorRadio === 'red',
      [s.radioBtnLabelBlue]: colorRadio === 'blue',
      [s.radioBtnLabelGreenBg]: watchValue === value && colorRadio === 'green',
      [s.radioBtnLabelRednBg]: watchValue === value && colorRadio === 'red',
      [s.radioBtnLabelBlueBg]: watchValue === value && colorRadio === 'blue',
    },
    classNameLabel,
  );
  return (
    <label className={finalRadioLabelClassName}>
      <input
        type="radio"
        {...register}
        value={value}
        className="visually-hidden"
      />
      {labelText}
    </label>
  );
};
