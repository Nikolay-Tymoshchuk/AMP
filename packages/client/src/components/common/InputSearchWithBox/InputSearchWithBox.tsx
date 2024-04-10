import cn from 'classnames';

import { SVG_CLOSE_10_10, SVG_SCOPE_12_12 } from '@/components/ui/Icons';

import { IInputSearchWithBox } from '@/interfaces/components.interfaces';
import { ChangeEvent, FC } from 'react';
import data from '@/data/data.json';

const { searchPlaceholder } = data;

export const InputSearchWithBox: FC<IInputSearchWithBox> = ({
  className,
  boxClassName,
  value,
  setValue,
  placeholder = searchPlaceholder,
}) => {
  const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.trim());
  };

  const handleClear = () => {
    setValue('');
  };

  const isEmpty = value === '';

  return (
    <div className={cn('relative inline-block', boxClassName)}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={handleChanges}
        autoFocus
        id="search"
        autoComplete="one-time-code"
        className={cn(
          'w-full rounded border border-darkBlue bg-white py-[6px] pl-3 pr-7 text-xs text-textDark outline-none placeholder:text-grey',
          className,
        )}
      />
      {isEmpty ? (
        <SVG_SCOPE_12_12
          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 hover:text-accent"
          width="12"
          height="12"
        />
      ) : (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 flex h-full -translate-y-1/2 items-center justify-center duration-150 hover:text-accent"
          type="button"
        >
          <SVG_CLOSE_10_10 width="10" height="10" className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
