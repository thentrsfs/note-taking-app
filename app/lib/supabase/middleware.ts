// lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // 👇 This MUST be here to initialize session correctly
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

const protectedRoutes = ['/', '/create-note', '/search', '/notes', '/settings', '/note', '/archived']

const isProtectedRoute = protectedRoutes.some((route) => {
  // exact match for "/"
  if (route === '/') return pathname === '/'
  // prefix match for others
  return pathname.startsWith(route)
})

// allow auth routes always
const isAuthRoute = pathname.startsWith('/auth')

// detect OAuth callback
const hasCode = request.nextUrl.searchParams.has('code')

if (!user && isProtectedRoute && !isAuthRoute && !hasCode) {
  const url = request.nextUrl.clone()
  url.pathname = '/login'
  return NextResponse.redirect(url)
}

  return response
}
