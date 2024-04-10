import Link from 'next/link';

import { SVG_LOGO_100_40 } from '@/components/ui/Icons';

import { ROUTES } from '@/interfaces/enums';

export const Logo = () => {
  return (
    <Link
      href={ROUTES.HOME}
      className="inline-block group text-orange transition-all duration-200 hover:scale-105 focus:scale-105"
    >
      <SVG_LOGO_100_40
        width={100}
        height={40}
        className="w-18 h-auto md:w-25"
      />
    </Link>
  );
};
