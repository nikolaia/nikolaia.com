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
    "/naar-autonomi-blir-anarki": "/posts/nar-autonomi-blir-anarki",
    "/tre-ting-du-ma-tenke-pa-for-du-gar-pa-tiktok":
      "/posts/tre-ting-du-ma-tenke-pa-for-du-gar-pa-tiktok",
    "/grunnen-til-at-du-ikke-far-til-smidig-er-fordi-du-fokuserer-pa-feil-ting":
      "/posts/grunnen-til-at-du-ikke-far-til-smidig-er-fordi-du-fokuserer-pa-feil-ting",
    "/ingenting-aa-skjule-det-er-fortsatt-problematisk-at-din-persondata-lagres-sentralt":
      "/posts/ingenting-a-skjule-persondata-lagres-sentralt",
    "/how-to-use-elastic-beanstalk-with-an-ip-whitelisted-api-terraform":
      "/posts/static-outgoing-ip-elastic-beanstalk-terraform",
    "/consolidate-nuget-packages-fake-target":
      "/posts/ensuring-nuget-packages-consolidated-fake-target",
    "/aspnet5-development-on-osx-with-docker":
      "/posts/aspnet-5-in-docker-on-osx",
    "/octopus-deploy-and-teamcity-integration-in-slack":
      "/posts/teamcity-and-octopus-deploy-in-slack",
    "/the-lean-startup": "/posts/the-lean-startup",
    "/using-canvas-and-a-webcam-to-track-objects":
      "/posts/using-canvas-and-a-webcam-to-track-objects",
  },
});
