import { type NextRequest } from 'next/server'
import { updateSession } from '@/app/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  console.log('Middleware hit:', request.nextUrl.pathname)
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|auth/callback|error|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}