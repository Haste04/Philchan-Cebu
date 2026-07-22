/** @type {import('tailwindcss').Config} */
export default {
  // Purge/content scanning — keeps production CSS tiny
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  theme: {
    extend: {
      colors: {
        // Brand token system — see README.md "Design direction" for rationale.
        // Named tokens (not "primary/secondary") so intent stays legible in markup.
        "deep-teal": {
          DEFAULT: "#0F4C5C",
          light: "#17677D",
          dark: "#0A3641",
        },
        "sanctuary-gold": {
          DEFAULT: "#C9A227",
          light: "#E0BE4E",
        },
        ribbon: {
          DEFAULT: "#A13D3D",
          dark: "#7E2F2F",
        },
        linen: "#F7F5F0",
        charcoal: "#262625",
        mist: "#E4E7E6",
      },

      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ['"Public Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },

      // Slightly wider type scale for the display face so headings breathe
      fontSize: {
        "display-xl": [
          "clamp(2.5rem, 5vw + 1rem, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.01em" },
        ],
        "display-lg": [
          "clamp(2rem, 3vw + 1rem, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
      },

      maxWidth: {
        content: "72rem", // 1152px — comfortable reading/section width
      },

      boxShadow: {
        card: "0 2px 8px rgba(15, 76, 92, 0.08), 0 1px 2px rgba(15, 76, 92, 0.06)",
      },
    },
  },

  plugins: [],
};
