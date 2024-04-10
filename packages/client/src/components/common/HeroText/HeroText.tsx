'use client';
import { motion } from 'framer-motion';

import s from './HeroText.module.css';
import data from '@/data/data.json';

export const HeroText = () => {
  const { heroTitle, heroDescription } = data;
  return (
    <div className={s.headingBox}>
      <div className="w-fit">
        <h1 className={s.typewriter}>{heroTitle}</h1>
      </div>
      <motion.p
        initial={{ opacity: 0, translateX: -100, scaleX: 0.8 }}
        animate={{ opacity: 1, translateX: 0, scaleX: 1 }}
        transition={{
          duration: 1,
          type: 'spring',
          stiffness: 200,
          damping: 10,
          delay: 4,
        }}
        className={s.description}
      >
        {heroDescription}
      </motion.p>
    </div>
  );
};
