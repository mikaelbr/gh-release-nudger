import { next, rewrite } from "@vercel/edge";

export default function middleware(request: Request) {
  const { pathname, searchParams } = new URL(request.url);

  // Get the secret from environment
  const authSecret = process.env.AUTH_SECRET;

  // If no secret is configured, allow all requests
  if (!authSecret) {
    return next();
  }

  if (searchParams.get("secret") !== authSecret) {
    // return new Response("Unauthorized", { status: 401 });
    return rewrite(new URL("/401", request.url));
  }

  // Authentication passed - continue to serve the static content
  return next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _vercel (Vercel internals)
     * - favicon.ico, robots.txt, etc.
     */
    "/((?!ap|!401|_next/static|_next/image|_vercel|favicon.ico|robots.txt|.*\\.).*)",
  ],
};
