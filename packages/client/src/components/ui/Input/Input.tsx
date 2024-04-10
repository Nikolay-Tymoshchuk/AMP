import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames';

import {
  SVG_EYE_CLOSED_24_24,
  SVG_EYE_OPENED_24_24,
} from '@/components/ui/Icons';

import s from './Input.module.css';

interface IProps {
  id?: string;
  label: string;
  type: 'text' | 'password' | 'email' | 'url';
  register: UseFormRegisterReturn;
  placeholder: string;
  className?: string;
  classNameInput?: string;
  value?: string;
  button?: boolean;
  error?: string | undefined;
}

export const Input = ({
  id,
  label,
  type,
  register,
  placeholder,
  className,
  classNameInput,
  value,
  button,
  error,
}: IProps) => {
  const [inputType, setInputType] = useState(type);

  const togglePassword = () => {
    inputType === 'text' ? setInputType('password') : setInputType('text');
  };

  return (
    <label className={cn(s.inputContainer, className)}>
      {label}

      <input
        id={id}
        className={cn(s.input, classNameInput, { [s.inputError]: error })}
        placeholder={placeholder}
        type={inputType}
        value={value}
        {...register}
      />

      {button && (
        <button className={s.iconBtn} type="button" onClick={togglePassword}>
          {inputType === 'password' ? (
            <SVG_EYE_CLOSED_24_24 width={24} height={24} />
          ) : (
            <SVG_EYE_OPENED_24_24 width={24} height={24} />
          )}
        </button>
      )}

      {error && <span className={s.msgError}>{error}</span>}
    </label>
  );
};
