/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "sans-serif",
          "Roboto",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        primary: "#0f172a",
        primaryLight: "#334155",
        secondary: "#AEDFF7",
        hover: "#475569",
        light: "#94a3b8",
        active: "#1e293b",
        lightBlue: "#67e8f9",
        lightest: "#e2e8f0",

        // Text
        textPrimary: "#d1d5db",
        textgrey: "#030712",
      },
      backgroundColor: {
        default: "#f1f5f9",
      },
      textColor: {
        primary: "#020617",
        secondary: "#475569",
        light: "#d1d5db",
        lightBlue: "#67e8f9",
      },
    },
  },
  // eslint-disable-next-line
  plugins: [require("tailwindcss-animate")],
};
