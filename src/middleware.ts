import { defineMiddleware } from "astro:middleware";
import { getSecret } from "astro:env/server";

export const onRequest = defineMiddleware(async (context, next) => {
  // Get the secret from environment variables
  const authSecret = getSecret("AUTH_SECRET");

  if (!authSecret) {
    // If no secret is configured, allow access (for development)
    return next();
  }

  // Get the secret parameter from the URL
  const url = new URL(context.request.url);
  const providedSecret = url.searchParams.get("secret");

  // Check if the provided secret matches the configured secret
  if (providedSecret !== authSecret) {
    // Return 401 Unauthorized
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "Content-Type": "text/plain",
        "WWW-Authenticate": 'Secret realm="Access to GitHub Release Stats"',
      },
    });
  }

  // Secret matches, allow access
  return next();
});
