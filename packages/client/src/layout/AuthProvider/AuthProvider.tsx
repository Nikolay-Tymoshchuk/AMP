import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import baseApi from '@/lib/baseApi';

import { IParent } from '@/interfaces/components.interfaces';
import { Spinner } from '@/components/ui/Spinner';

export const AuthProvider = ({ children }: IParent) => {
  const { data: session, status } = useSession();
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return; // Session is still loading
    if (session) {
      baseApi.defaults.headers.common['Authorization'] =
        `Bearer ${session?.user?.token}`;
    }
    setIsSessionLoading(false);
  }, [session, status]);

  if (isSessionLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  return <>{children}</>;
};
