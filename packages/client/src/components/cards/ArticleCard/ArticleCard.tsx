import React, { FC } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

import { ALink } from '@/components/ui/ALink';
import ImgPlaceholder from '~/public/images/image_placeholder_178-178..webp';

import { IArticle } from '@/interfaces/article.interfaces';

export const ArticleCard: FC<IArticle> = ({
  title,
  description,
  enclosureType,
  enclosureUrl,
  guid,
  pubDate,
}) => {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className="rounded w-full h-full shadow-md overflow-hidden flex flex-col border border-accentGrey text-xs bg-indigo-50"
    >
      <div className="border-b border-b-accentGrey grid grid-cols-[100px,_auto] gap-x-3 bg-blue-100">
        <div className="border-r border-r-accentGrey w-25 aspect-[3/2] content-center overflow-hidden">
          <Image
            width={160}
            height={90}
            className="w-25 h-auto"
            alt={title}
            src={enclosureUrl || ImgPlaceholder}
            itemType={enclosureType || undefined}
          />
        </div>
        <div className="py-1.5 pr-1.5">
          <h3 className="font-semibold  line-clamp-3">{title}</h3>
        </div>
      </div>
      <div className="grid grid-cols-[100px,_auto] gap-x-3 flex-1 bg-zinc-200">
        <div className="flex items-center justify-center border-r border-r-accentGrey">
          <ALink href={guid} />
        </div>
        <div className="py-1.5 pr-1.5 flex flex-col gap-y-4 justify-between">
          <p className="line-clamp-2">{description}</p>
          <time className="text-gray-400 ml-auto">
            {format(new Date(pubDate), 'HH:mm:ss | dd/MM/yyyy')}
          </time>
        </div>
      </div>
    </motion.article>
  );
};
