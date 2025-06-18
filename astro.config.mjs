// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import { envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({ context: "server", access: "secret" }),
      GITHUB_REPOS: envField.string({ context: "server", access: "secret" }),
      RELEASE_HOURS_THRESHOLD: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      AUTH_SECRET: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    imagesConfig: {
      sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      domains: [],
      minimumCacheTTL: 300,
    },
  }),
});
