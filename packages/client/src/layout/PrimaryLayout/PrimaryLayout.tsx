import { PrimaryLayoutClient } from '@/layout/PrimaryLayoutClient';
import { Header } from '@/layout/Header';
import { Hero } from '@/layout/Hero';

import { IPrimaryLayout } from '@/interfaces/components.interfaces';

export const PrimaryLayout = ({
  children,
  withHero,
  title,
}: IPrimaryLayout) => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between py-10 md:pt-14 lg:py-18 gap-y-5 md:gap-y-10">
        {withHero && <Hero />}
        <div className="container flex-1">
          <section className="flex flex-col gap-y-8 min-h-[50vh]">
            <PrimaryLayoutClient title={title}>{children}</PrimaryLayoutClient>
          </section>
        </div>
      </main>
    </>
  );
};
