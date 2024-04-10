import React from 'react';

import { SVG_HERO_200_200 } from '@/components/ui/Icons';

import { HeroText } from '@/components/common/HeroText';

import s from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={s.hero}>
      <div className={s.heroContainer}>
        <HeroText />
        <SVG_HERO_200_200 width={200} height={200} className={s.icon} />
      </div>
    </section>
  );
};
