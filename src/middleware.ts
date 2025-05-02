import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  // we have some public (login or signup) and some private paths
  // if the user has token he will not allowed to access login or signup and vice versa
  const path = request.nextUrl.pathname
  
  const isPublicPath = path === "/login"  || path === "/signup"

  const token = request.cookies.get("token")?.value || ""

  if(isPublicPath && token){
    return NextResponse.redirect(new URL("/profile",request.nextUrl))
  }

  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL("/login",request.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile"
  ],
}