import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import { SVG_CLOSE_10_10 } from '@/components/ui/Icons';

import s from './Modal.module.css';

interface IModalProps {
  onClick: () => void;
  children?: ReactNode;
  classNameModal?: string;
}

export const Modal: FC<IModalProps> = ({
  onClick,
  children,
  classNameModal,
}) => {
  const [rootDiv, setRootDiv] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.createElement('div');
    root.id = 'modal';
    document.body.appendChild(root);
    setRootDiv(root);
    return () => {
      if (document.body.contains(root)) {
        document.body.removeChild(root);
      }
    };
  }, []);

  useEffect(() => {
    document.body.classList.add('blockScroll');
    document.addEventListener('keydown', onClickEscClose);

    return () => {
      document.removeEventListener('keydown', onClickEscClose);
      document.body.classList.remove('blockScroll');
    };
  });

  const onClickEscClose = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      onClick();
    }
  };

  const onClickBackdropClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return rootDiv
    ? createPortal(
        <div
          id="backdrop"
          className={cn(s.backdrop)}
          onClick={onClickBackdropClose}
        >
          <div className={cn(s.modal, classNameModal)}>
            <button
              type="button"
              aria-label="Кнопка закриття модального вікна"
              onClick={onClick}
              className={cn(s.modalIconCloseWrapper)}
            >
              <SVG_CLOSE_10_10 width={24} height={24} className="w-4 auto" />
            </button>
            {children}
          </div>
        </div>,
        rootDiv,
      )
    : null;
};
