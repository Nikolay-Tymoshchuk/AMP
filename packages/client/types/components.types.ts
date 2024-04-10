import {
  ILoginFormFields,
  IRegisterFormFields,
} from '@/interfaces/components.interfaces';
import { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode, Ref } from 'react';

export type TIcon = React.FunctionComponent<React.SVGAttributes<SVGElement>>;

export type TCasualLink = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & { children?: ReactNode };

export type TInnerLink = LinkProps & {
  children?: ReactNode;
  className?: string;
};

export type TCasualInput = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { ref?: Ref<HTMLInputElement> };

export type TAuthForm = ILoginFormFields & Partial<IRegisterFormFields>;

export type TEditArticleForm = {
  title: string;
  description: string;
  enclosureUrl: string | null;
  updatePubDate: boolean;
};

export type TVoidFunction = () => void;
