'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import { useAuthHook } from '@/hooks';

import { ROUTES } from '@/interfaces/enums';
import data from '@/data/data.json';

const {
  authFormTextData: {
    roles: { labels },
  },
} = data;

export const EditorNavItem = () => {
  const { isAuthenticated, role } = useAuthHook();
  const pathname = usePathname();

  const isEditorPage = pathname === ROUTES.EDITOR;

  if (!isAuthenticated) {
    return null;
  }
  return (
    <Link
      href={ROUTES.EDITOR}
      className={cn(
        'px-3 font-semibold text-sm md:text-base lg:text-xl h-full flex items-center uppercase hover:bg-accent text-accentGrey transition-colors duration-200',
        isEditorPage && 'bg-accent',
      )}
    >
      {role ? labels[role] : labels.GUEST}
    </Link>
  );
};
