// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import { satteri } from "@astrojs/markdown-satteri";

import { defineHastPlugin } from "satteri";

/** Open external links in Markdown in a new tab. */
const externalLinks = defineHastPlugin({
  name: "external-links",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href === "string" && /^https?:\/\//.test(href)) {
        ctx.setProperty(node, "target", "_blank");
        ctx.setProperty(node, "rel", "noopener noreferrer");
      }
    },
  },
});

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
