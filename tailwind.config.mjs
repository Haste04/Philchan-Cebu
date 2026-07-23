/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  theme: {
    extend: {
      colors: {
        // Softened Red, Green, White theme - Warm Community Hospital
        "health-white": "#FCFBF9",
        "health-bg": "#F2F4F0",
        "health-green": {
          DEFAULT: "#2C5E48",
          light: "#4A8268",
          pale: "#E3EDE7",
        },
        "health-red": {
          DEFAULT: "#D95B5B",
          dark: "#B53B3B",
          light: "#ECA2A2",
        },
        "health-text": "#2D3732",
        "health-border": "#D1DBD5",
      },

      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ['"Public Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },

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
        content: "72rem",
      },

      boxShadow: {
        card: "0 12px 40px rgba(44, 94, 72, 0.08), 0 4px 12px rgba(44, 94, 72, 0.04)",
        soft: "0 20px 40px -12px rgba(0,0,0,0.05)",
      },
      
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },

  plugins: [],
};
