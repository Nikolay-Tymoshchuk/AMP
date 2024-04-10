import { AuthActionBtnLink } from '@/components/common/AuthActionBtnLink';
import { EditorNavItem } from '@/components/common/EditorNavItem';
import { Logo } from '@/components/ui/Logo';

import s from './Header.module.css';

export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <div className="flex gap-15 items-center h-10 md:h-14 lg:h-18">
          <Logo />
          <EditorNavItem />
        </div>
        <AuthActionBtnLink />
      </nav>
    </header>
  );
};
