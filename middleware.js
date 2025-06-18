export default function middleware(request) {
  const { pathname, searchParams } = new URL(request.url);

  // Get the secret from environment
  const authSecret = process.env.AUTH_SECRET;

  // If no secret is configured, allow all requests
  if (!authSecret) {
    return;
  }

  // Skip auth for certain paths (favicon, assets, etc.)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    (pathname.includes(".") && !pathname.endsWith(".html"))
  ) {
    return;
  }

  // Get provided secret from query parameters
  const providedSecret = searchParams.get("secret");

  // Check if secret matches
  if (providedSecret !== authSecret) {
    // Return 401 with a simple HTML response
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>401 Unauthorized</title>
          <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
          <style>
            :root {
              --ttv-bg: #000;
              --ttv-white: #fff;
              --ttv-yellow: #ffff00;
              --ttv-cyan: #00ffff;
              --ttv-red: #ff0000;
            }
            
            body {
              background: var(--ttv-bg);
              color: var(--ttv-white);
              font-family: "Press Start 2P", "Courier New", Courier, monospace;
              margin: 0;
              padding: 0;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
            }
            
            .error-code {
              font-size: clamp(4rem, 12vw, 8rem);
              color: var(--ttv-red);
              font-weight: bold;
              letter-spacing: 0.1em;
              margin-bottom: 1rem;
            }
            
            .error-message {
              font-size: clamp(1.5rem, 4vw, 2.5rem);
              color: var(--ttv-yellow);
              font-weight: bold;
              letter-spacing: 0.05em;
              margin-bottom: 2rem;
            }
            
            .error-description {
              font-size: clamp(0.9rem, 2vw, 1.2rem);
              color: var(--ttv-cyan);
              max-width: 600px;
              line-height: 1.6;
              margin-bottom: 2rem;
            }
            
            .error-example {
              font-size: clamp(0.8rem, 1.8vw, 1rem);
              color: var(--ttv-white);
              background: rgba(255, 255, 255, 0.1);
              padding: 1rem 2rem;
              border: 1px solid var(--ttv-yellow);
              border-radius: 4px;
              font-family: 'Courier New', monospace;
              letter-spacing: 0.02em;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="error-code">401</div>
          <div class="error-message">UNAUTHORIZED ACCESS</div>
          <div class="error-description">
            YOU NEED A VALID SECRET PARAMETER TO ACCESS THIS SITE
          </div>
          <div class="error-example">
            EXAMPLE: ${new URL(request.url).origin}/?secret=your-secret-key
          </div>
        </body>
      </html>
    `,
      {
        status: 401,
        headers: {
          "Content-Type": "text/html",
          "WWW-Authenticate": 'Secret realm="GitHub Release Stats"',
        },
      }
    );
  }

  // Authentication passed - continue to serve the static content
  return;
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
    "/((?!api|_next/static|_next/image|_vercel|favicon.ico|robots.txt|.*\\.).*)",
  ],
};
