import { NextRequest, NextResponse } from 'next/server';

// This middleware runs in the Edge runtime
export function middleware(request: NextRequest) {
  // Protected routes that require authentication
  const protectedPathsRegex = /^\/dashboard|^\/profile|^\/contests\/create|^\/achievements/;
  const isProtectedRoute = protectedPathsRegex.test(request.nextUrl.pathname);
  const isAuthRoute = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';

  // Check for authentication by looking for the session token cookie
  const authCookie = request.cookies.get('next-auth.session-token') || 
                    request.cookies.get('__Secure-next-auth.session-token');
  const isAuthenticated = !!authCookie;

  // Protected routes require authentication
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Login/Signup pages should redirect to dashboard if already authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/contests/create',
    '/achievements/:path*',
    '/login',
    '/signup',
  ],
};