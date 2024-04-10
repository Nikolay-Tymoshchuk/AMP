import { SetStateAction, Dispatch, ReactNode } from 'react';
import { SORT_BY, TYPE_AUTH, USER_ROLE } from './enums';
import { IArticle } from './article.interfaces';

export interface IParent {
  children: ReactNode;
}

export interface IPrimaryLayout extends IParent {
  withHero?: boolean;
}

export interface ItemsOnPageSelectProps {
  perPage: number;
  onPerPageClick: Dispatch<SetStateAction<number>>;
}

export interface ISortBySelectProps {
  sortBy: SORT_BY;
  setSortBy: Dispatch<SetStateAction<string>>;
}

export interface IClassNamesProps {
  className?: string;
}

export interface IItemsOnPage {
  length: number;
  total: number;
}

export interface IInputSearchWithBox {
  className?: string;
  boxClassName?: string;
  value: any;
  placeholder?: string;
  setValue: any;
}

export interface IAuthFormDataProps {
  title: string;
  navLink: {
    textBeforeLink: string;
    textLink: string;
  };
  separationText: string;
  inputEmailText: {
    label: string;
    placeholder: string;
  };
  inputPasswordText: {
    label: string;
    placeholder: string;
  };
  checkboxText: string;
  textBtnLinkText?: string;
  buttonSubmitText: string;
}

export interface INotificationAuthMessages {
  email: {
    patternMessage: string;
    minLengthMessage: string;
    maxLengthMessage: string;
    checkEmailLoginMessage: string;
    checkEmailRegistrationMessage: string;
  };
  password: {
    patternMessage: string;
    minLengthMessage: string;
    maxLengthMessage: string;
  };
  registration: {
    success: {
      title: string;
      message: string;
    };
  };
}

export interface IFormAuthProps {
  typeAuth: TYPE_AUTH;
}

export interface ILoginFormFields {
  email: string;
  password: string;
}

export interface IRegisterFormFields extends ILoginFormFields {
  confirmPassword: string;
  name: string;
  role: USER_ROLE;
}

export interface IArticleModalOption {
  article: IArticle;
  mode: 'edit' | 'delete';
}
