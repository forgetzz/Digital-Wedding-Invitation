import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF6EC",
        beige: {
          DEFAULT: "#F1E6D3",
          light: "#F7EFE2",
          dark: "#E4D3B4",
        },
        gold: {
          DEFAULT: "#C6A15B",
          light: "#E3CB98",
          dark: "#9C7A3D",
        },
        sage: {
          DEFAULT: "#48583E",
          light: "#71805F",
          dark: "#2F3A28",
        },
        ink: "#332C22",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      borderRadius: {
        organic: "255px 15px 225px 15px/15px 225px 15px 255px",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(51, 44, 34, 0.18)",
        card: "0 8px 30px -10px rgba(72, 88, 62, 0.22)",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
