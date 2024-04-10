'use client';
import { Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';

import { SVG_EDIT_11_12, SVG_DELETE_10_12 } from '@/components/ui/Icons';

import { IArticle } from '@/interfaces/article.interfaces';
import { ACCESSOR, HEADERS } from '@/interfaces/enums';
import { USER_ROLE } from '@/interfaces/enums';
import { IArticleModalOption } from '@/interfaces/components.interfaces';

export const ArticlesTableColumns = (
  setModalOptions: Dispatch<SetStateAction<IArticleModalOption>>,
  role: USER_ROLE,
): ColumnDef<IArticle>[] => {
  const isPermission = role != USER_ROLE.GUEST;
  const isCustomer = role === USER_ROLE.CUSTOMER;
  const isNotAdmin = role !== USER_ROLE.ADMIN;

  const handleOpenEdit = (article: IArticle) => {
    setModalOptions({ mode: 'edit', article });
  };

  const handleOpenDelete = (article: IArticle) => {
    setModalOptions({ mode: 'delete', article });
  };

  const optionColumn = {
    footer: HEADERS.OPTIONS,
    accessorKey: ACCESSOR.ID,
    header: HEADERS.OPTIONS,
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <div className="flex items-center justify-center gap-2 p-1">
          <button
            onClick={() => handleOpenEdit(row.original)}
            disabled={isCustomer}
            className="text-green disabled:text-grey hover:scale-125 active:scale-90 transition-transform disabled:pointer-events-none"
          >
            <SVG_EDIT_11_12 width={11} height={12} className="w-3 h-auto" />
          </button>
          /
          <button
            onClick={() => handleOpenDelete(row.original)}
            className="text-red disabled:text-grey hover:scale-125 active:scale-90 transition-transform disabled:pointer-events-none"
            disabled={isNotAdmin}
          >
            <SVG_DELETE_10_12 width={10} height={12} className="w-3 h-auto" />
          </button>
        </div>
      );
    },
    enableSorting: false,
  };

  const columns: ColumnDef<IArticle>[] = [
    {
      footer: HEADERS.TITLE,
      accessorKey: ACCESSOR.TITLE,
      header: HEADERS.TITLE,
      cell: ({ row }) => {
        return (
          <p className="max-[300px] whitespace-break-spaces break-words">
            {row.original.title || ''}
          </p>
        );
      },
    },
    {
      footer: HEADERS.LINK,
      accessorKey: ACCESSOR.LINK,
      header: HEADERS.LINK,
      cell: ({ row }) => {
        return (
          <a
            href={row.original.link}
            target="_blank"
            rel="noreferrer noopener nofollow"
            className="underline max-w-[200px] truncate"
          >
            Посилання
          </a>
        );
      },
      enableSorting: false,
    },
    {
      footer: HEADERS.DESCRIPTION,
      accessorKey: ACCESSOR.DESCRIPTION,
      header: HEADERS.DESCRIPTION,
      cell: ({ row }) => {
        return (
          <p className="max-[300px] whitespace-break-spaces break-words">
            {row.original.description}
          </p>
        );
      },
    },
    {
      footer: HEADERS.DATE,
      accessorKey: ACCESSOR.DATE,
      header: HEADERS.DATE,
      cell: ({ row }) => {
        const { pubDate } = row.original;
        const date = format(new Date(pubDate), 'HH:mm:ss | dd/MM/yyyy');
        return <p className="text-right">{date}</p>;
      },
    },
  ];

  return isPermission ? [optionColumn, ...columns] : columns;
};
