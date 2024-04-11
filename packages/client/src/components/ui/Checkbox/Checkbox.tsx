import { FC, useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames';

import { SVG_CHECK_MARK_11_8 } from '@/components/ui/Icons';

import s from './Checkbox.module.css';

export interface ICheckboxProps {
  labelText: string;
  register?: UseFormRegisterReturn;
  className?: string;
  watchValue?: boolean;
}

export const Checkbox: FC<ICheckboxProps> = ({
  labelText,
  watchValue,
  register,
  className,
}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (!watchValue) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [watchValue]);

  return (
    <label
      className={cn(s.checkboxLabel, checked && 'text-accent', className)}
      onChange={handleChange}
    >
      <input
        type="checkbox"
        {...register}
        className={cn('hidden', s.checkbox)}
      />

      <div className={cn(s.checkboxWrapper)}>
        {checked && (
          <SVG_CHECK_MARK_11_8 width={11} height={8} className="w-3 h-auto" />
        )}
      </div>
      <p className={s.textWrapper}>{labelText}</p>
    </label>
  );
};
