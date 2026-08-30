/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Grounding ink — deep evergreen, never pure black
        ink: {
          DEFAULT: "#1E2A28",
          soft: "#34423E",
        },
        // Primary — evergreen "home & safety"
        evergreen: {
          DEFAULT: "#2F6F5E",
          deep: "#245546",
          soft: "#5C9486",
          wash: "#E7F0EC",
        },
        // Warm paper backgrounds — "a kept home", not stark white
        paper: {
          DEFAULT: "#FAF7F1",
          raised: "#FFFEFB",
          sunk: "#F2EEE5",
        },
        // Stone — borders & quiet structure
        stone: {
          DEFAULT: "#E7E2D8",
          deep: "#D6CFC1",
        },
        // Honey — the "the light is on / memory glow" accent. Use sparingly.
        honey: {
          DEFAULT: "#E0A458",
          deep: "#C5852F",
          wash: "#FBF1E1",
        },
        // Muted clay for attention/overdue
        clay: {
          DEFAULT: "#C56A4E",
          wash: "#F8E9E2",
        },
        muted: "#6B746F",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(30,42,40,0.04), 0 8px 24px rgba(30,42,40,0.06)",
        lift: "0 2px 4px rgba(30,42,40,0.05), 0 16px 40px rgba(30,42,40,0.10)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-roof": {
          "0%": { strokeDashoffset: "120" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up":    "fade-up 0.5s ease-out both",
        "draw-roof":  "draw-roof 0.9s ease-out both",
      },
    },
  },
  plugins: [],
};
