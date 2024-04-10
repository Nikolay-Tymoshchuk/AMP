enum REQUEST_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

enum KEYS {
  ARTICLES = 'Articles',
  AUTH = 'Auth',
}

enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  SIGNUP = '/register',
  API_AUTH = '/auth',
  API_LOGIN = '/auth/login',
  API_SIGNUP = '/auth/signup',
  API_LOGOUT = '/auth/logout',
  ARTICLES = '/articles',
  EDITOR = '/role',
}

enum SORT_BY {
  INCREASE_DATE = 'pubDate',
  DECREASE_DATE = '-pubDate',
  INCREASE_TITLE = 'title',
  DECREASE_TITLE = '-title',
}

enum TYPE_AUTH {
  REGISTRATION = 'registration',
  LOGIN = 'logIn',
}

enum USER_ROLE {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  GUEST = 'GUEST',
  REDACTOR = 'REDACTOR',
}

enum HEADERS {
  OPTIONS = 'Опції',
  TITLE = 'Заголовок',
  LINK = 'Посилання',
  DESCRIPTION = 'Опис',
  DATE = 'Дата публікації',
}

enum ACCESSOR {
  ID = '_id',
  TITLE = 'title',
  LINK = 'link',
  DESCRIPTION = 'description',
  DATE = 'pubDate',
}

export {
  REQUEST_METHODS,
  KEYS,
  ROUTES,
  SORT_BY,
  TYPE_AUTH,
  USER_ROLE,
  HEADERS,
  ACCESSOR,
};
