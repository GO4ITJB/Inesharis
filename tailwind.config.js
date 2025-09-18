/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "wedding-pink": "#D6A9A3",
        "wedding-dark": "#D6A9A3",
        "wedding-brown": "#6B5B57",
        "wedding-greige": "#D8D3CD",
        "wedding-sand": "#F2E7DE",
        "wedding-beige": "#F6EEE9",
        "warm-background": "#F6EEE9",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#374151",
            h1: {
              color: "#111827",
            },
            h2: {
              color: "#111827",
            },
            h3: {
              color: "#111827",
            },
            h4: {
              color: "#111827",
            },
          },
        },
      },
      letterSpacing: {
        wide: "0.1em",
        wider: "0.15em",
        widest: "0.2em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
