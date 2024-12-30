// src/middleware.ts
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthPage = request.nextUrl.pathname === '/auth/login'
  const isNewUser = request.nextUrl.pathname === '/auth/onboarding'

//   if (!token && !isAuthPage && !isNewUser) {
//     return NextResponse.redirect(new URL('/auth/login', request.url))
//   }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}