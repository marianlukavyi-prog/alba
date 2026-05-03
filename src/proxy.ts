import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/i18n/config'

const ALL_LOCALES = locales as readonly string[]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0] ?? ''

  if (firstSegment === defaultLocale) {
    const target = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '/'
    const url = request.nextUrl.clone()
    url.pathname = target
    return NextResponse.redirect(url)
  }

  if (ALL_LOCALES.includes(firstSegment)) {
    return
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next|api|admin|studio|.*\\..*).*)'],
}
