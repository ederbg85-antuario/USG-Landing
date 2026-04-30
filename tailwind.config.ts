import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        usg: {
          red: "#C8102E",
          "red-dark": "#9E0A21",
          "red-light": "#E63946",
          gray: "#4A4A4A",
          "gray-dark": "#2B2B2B",
          black: "#0A0A0A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
      },
      backgroundImage: {
        "stadium-gradient":
          "linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 50%, #2B2B2B 100%)",
        "red-gradient":
          "linear-gradient(135deg, #C8102E 0%, #9E0A21 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "bounce-slow": "bounce 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
