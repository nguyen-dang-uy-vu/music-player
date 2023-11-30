module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{vue,js}", "./src/locales/ja.json"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        default: ["Noto Sans JP", "sans-serif"],
      },
      margin: {
        15: "3.75rem",
        45: "11.25rem",
      },
      lineHeight: {
        14: "1.4",
      },
      colors: {
        black: {
          DEFAULT: "#000000",
        },
        gray: {
          DEFAULT: "#FAFAFA",
          secondary: "#F5F5F5",
          150: "#AFAFAF",
          250: "#ACACAC",
          350: "#C0C4CC",
          550: "#F5F7FA",
          650: "#E4E4E4",
          750: "#F1F1F1",
          850: "#CCCCCC",
          950: "#333333",
          960: "#565656",
          970: "#F3F3F3",
        },
        blue: {
          DEFAULT: "#13155D",
          650: "#517DBF",
          350: "#B2B3C2",
        },
        red: {
          DEFAULT: "#FF0000",
          150: "#FF9900",
        },
        green: {
          DEFAULT: "#66CF35",
        },
      },
      width: {
        22: "5.5rem",
        30: "7.5rem",
        43: "10.5rem",
      },
      inset: {
        35: "8.75rem",
        45: "11.25rem",
      },
      fontSize: {
        small: "0.5rem",
        tiny: "0.625rem",
        h1: "1.25rem",
        h2: "1rem",
        h3: "0.875rem",
        normal: "0.875rem",
      },
      screens: {
        sm: { max: "767px" },
        md: { min: "768px", max: "1023px" },
        lg: { min: "1024px", max: "1279px" },
        xl: { min: "1280px", max: "1439px" },
        "2xl": { min: "1440px", max: "1919px" },
        "3xl": { min: "1920px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
