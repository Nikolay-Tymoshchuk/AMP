import { IParent } from '@/interfaces/components.interfaces';
import { AuthWrapper } from '@/layout/AuthWrapepr';

export default function AuthLayout({ children }: IParent) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
