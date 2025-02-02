import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        insidebg: "var(--insideground)",
        clockground: "var(--clockground)",
      },
      fontFamily: {
        sevenSegment: ['SevenSegment', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
