import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://philchancebu.org",
  integrations: [
    tailwind({
      applyBaseStyles: false, // Prevents conflicts with global.css
    }),
    sitemap(),
  ],
  output: "static",
});
