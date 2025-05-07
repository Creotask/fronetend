import { NextRequest, NextResponse } from 'next/server';

// This middleware runs in the Edge runtime
export function middleware(request: NextRequest) {
  // Protected routes that require authentication
  const protectedPathsRegex = /^\/dashboard|^\/profile|^\/contests\/create|^\/achievements/;
  const isProtectedRoute = protectedPathsRegex.test(request.nextUrl.pathname);
  const isAuthRoute = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';

  // Check for authentication by looking for ANY of the session token cookies
  // NextAuth uses different cookie names depending on environment
  const possibleCookieNames = [
    'next-auth.session-token',
    '__Secure-next-auth.session-token',
    '__Host-next-auth.session-token',
    // For development
    'next-auth.session-token.1',
    // JWT
    'next-auth.jwt-token'
  ];
  
  let authCookie = null;
  for (const cookieName of possibleCookieNames) {
    const cookie = request.cookies.get(cookieName);
    if (cookie) {
      authCookie = cookie;
      console.log('Found auth cookie:', cookieName);
      break;
    }
  }
  
  const isAuthenticated = !!authCookie;
  
  console.log('Middleware - Path:', request.nextUrl.pathname);
  console.log('Middleware - Is Protected Route:', isProtectedRoute);
  console.log('Middleware - Auth Cookie Present:', isAuthenticated);
  console.log('Middleware - Cookies:', Array.from(request.cookies.getAll()).map(c => c.name).join(', '));

  // Protected routes require authentication
  if (isProtectedRoute && !isAuthenticated) {
    console.log('Middleware - Redirecting to login');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Login/Signup pages should redirect to dashboard if already authenticated
  if (isAuthRoute && isAuthenticated) {
    console.log('Middleware - Already authenticated, redirecting to dashboard');
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