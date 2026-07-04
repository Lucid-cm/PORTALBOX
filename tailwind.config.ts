import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        primary: "#111111",
        accent: "#F5B942",
        success: "#22C55E",
        muted: "#6B7280",
        border: "#E5E7EB",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(17, 17, 17, 0.06)",
        card: "0 4px 24px rgba(17, 17, 17, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
