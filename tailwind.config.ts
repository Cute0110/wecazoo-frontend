import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-accent": "var(--color-primary-accent)",
        secondary: "var(--color-secondary)",
        "secondary-accent": "var(--color-secondary-accent)",
        background: "var(--color-background)",
        foreground: "var(--color-text)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        sans: ["var(--font-open-sans)", "Arial", "sans-serif"],
        heading: ["var(--font-montserrat)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
