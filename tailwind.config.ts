import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        valley: {
          red: "#B3202A",
          "red-dark": "#8A171F",
          navy: "#0B1426",
          "navy-light": "#132038",
          gold: "#D4AF37",
          cream: "#F8F6F1",
        },
      },
      fontFamily: {
        display: [
          "Georgia",
          "Cambria",
          "'Times New Roman'",
          "Times",
          "serif",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "stitch-pattern":
          "repeating-linear-gradient(45deg, rgba(212,175,55,0.06) 0, rgba(212,175,55,0.06) 1px, transparent 1px, transparent 12px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
