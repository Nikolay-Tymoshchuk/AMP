import Link from 'next/link';
import cn from 'classnames';

import s from './Button.module.css';

interface ButtonProps {
  text?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  isDisabled?: boolean;
  className?: string;
  link?: string;
}

export const Button = ({
  text,
  type,
  onClick,
  isDisabled,
  className,
  link,
}: ButtonProps) => {
  const finalClassName = cn(s.btn, className);

  return (
    <>
      {link && (
        <Link href={link} className={finalClassName}>
          {text && <span>{text}</span>}
        </Link>
      )}

      {!link && (
        <button
          type={type}
          onClick={onClick}
          className={finalClassName}
          disabled={isDisabled}
        >
          {text && <span className={s.text}>{text}</span>}
        </button>
      )}
    </>
  );
};
