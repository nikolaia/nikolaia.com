import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
  experimental: {
    contentLayer: true,
  },
  redirects: {
    // old urls to new urls for SEO
    "/naar-autonomi-blir-anarki": "/posts/naar-autonomi-blir-anarki",
    "/tre-ting-du-ma-tenke-pa-for-du-gar-pa-tiktok":
      "/posts/tre-ting-du-ma-tenke-pa-for-du-gar-pa-tiktok",
    "/grunnen-til-at-du-ikke-far-til-smidig-er-fordi-du-fokuserer-pa-feil-ting":
      "/posts/grunnen-til-at-du-ikke-far-til-smidig-er-fordi-du-fokuserer-pa-feil-ting",
    "/ingenting-aa-skjule-det-er-fortsatt-problematisk-at-din-persondata-lagres-sentralt":
      "/posts/ingenting-aa-skjule-det-er-fortsatt-problematisk-at-din-persondata-lagres-sentralt",
    "/how-to-use-elastic-beanstalk-with-an-ip-whitelisted-api-terraform":
      "/posts/how-to-use-elastic-beanstalk-with-an-ip-whitelisted-api-terraform",
    "/consolidate-nuget-packages-fake-target":
      "/posts/consolidate-nuget-packages-fake-target",
    "/aspnet5-development-on-osx-with-docker":
      "/posts/aspnet5-development-on-osx-with-docker",
    "/octopus-deploy-and-teamcity-integration-in-slack":
      "/posts/octopus-deploy-and-teamcity-integration-in-slack",
    "/the-lean-startup": "/posts/the-lean-startup",
    "/using-canvas-and-a-webcam-to-track-objects":
      "/posts/using-canvas-and-a-webcam-to-track-objects",
  },
});
