import { IParent } from '@/interfaces/components.interfaces';
import s from './AuthWrapper.module.css';

export const AuthWrapper = ({ children }: IParent) => {
  return (
    <main className={s.main}>
      <div className={s.decor}></div>
      <div className={s.authContainer}>{children}</div>
    </main>
  );
};
