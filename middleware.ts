import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes that require authentication
  const protectedRoutes = ['/communities', '/chat', '/profile', '/settings'];
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  // If accessing a protected route without a session, redirect to login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If accessing login/signup while already logged in, redirect to communities
  const authRoutes = ['/login', '/signup'];
  const isAuthRoute = authRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/communities', req.url));
  }

  return response;
}

export const config = {
  matcher: ['/communities/:path*', '/chat/:path*', '/profile/:path*', '/settings/:path*', '/login', '/signup'],
};
