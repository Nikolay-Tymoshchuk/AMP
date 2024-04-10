import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(request: NextRequestWithAuth, res: any) {
    console.log('pathname', request.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token?.role,
    },
  },
);

export const config = {
  matcher: ['/editor'],
};
