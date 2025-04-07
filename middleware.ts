import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Log all API requests for monitoring
  if (request.nextUrl.pathname.startsWith("/api/")) {
    console.log(`API Request: ${request.method} ${request.nextUrl.pathname}`)

    // Add headers to prevent caching of API responses
    const response = NextResponse.next()
    response.headers.set("Cache-Control", "no-store, max-age=0")
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"],
}

