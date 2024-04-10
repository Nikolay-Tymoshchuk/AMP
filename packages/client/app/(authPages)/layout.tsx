import { IParent } from '@/interfaces/components.interfaces';
import { AuthWrapper } from '@/layout/AuthWrapepr';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: IParent) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
