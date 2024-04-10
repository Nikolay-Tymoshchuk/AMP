'use client';
import cn from 'classnames';

import { useAuth } from '@/lib/hooks/useAuth';
import { useAuthHook } from '@/hooks';

import { SVG_LOGIN_20_20 } from '@/components/ui/Icons';
import { IconLink } from '@/components/ui/IconLink';

import { ROUTES } from '@/interfaces/enums';
import s from './AuthActionBtnLink.module.css';

export const AuthActionBtnLink = () => {
  const { isAuthenticated } = useAuthHook();
  const { useLogout } = useAuth();
  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {isAuthenticated !== undefined && (
        <div>
          {isAuthenticated ? (
            <button onClick={handleLogout} className={s.auth}>
              <SVG_LOGIN_20_20
                width={20}
                height={20}
                className={cn(s.icon, 'rotate-180')}
              />
            </button>
          ) : (
            <IconLink href={ROUTES.LOGIN} className={s.auth}>
              <SVG_LOGIN_20_20 width={20} height={20} className={s.icon} />
            </IconLink>
          )}
        </div>
      )}
    </>
  );
};
