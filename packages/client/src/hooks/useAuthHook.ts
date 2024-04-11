import { USER_ROLE } from '@/interfaces/enums';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useAuthHook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined,
  );
  const [role, setRole] = useState<USER_ROLE>();
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status != 'loading' && !session) {
      setIsAuthenticated(false);
    }

    if (session) {
      setIsAuthenticated(true);
      setRole(session.user?.role);
      setName(session.user?.name);
      setToken(session.user?.token);
    }
  }, [session, status]);

  return { isAuthenticated, role, name, token };
};
