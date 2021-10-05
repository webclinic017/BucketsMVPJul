module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        byellow: {
          50: "#fffdf2",
          100: "#fffbe6",
          200: "#fff5bf",
          300: "#ffef99",
          400: "#ffe34d",
          500: "#ffd700",
          600: "#e6c200",
          700: "#bfa100",
          800: "#998100",
          900: "#7d6900",
        },
        "shadow-green": {
          50: "#fafcfc",
          100: "#f5faf9",
          200: "#e6f2ef",
          300: "#d7eae5",
          400: "#b9dad2",
          500: "#9bcabe",
          600: "#8cb6ab",
          700: "#74988f",
          800: "#5d7972",
          900: "#4c635d",
        },
        terracotta: {
          50: "#fef9f8",
          100: "#fef2f1",
          200: "#fce0dc",
          300: "#facdc7",
          400: "#f7a79d",
          500: "#f38173",
          600: "#db7468",
          700: "#b66156",
          800: "#924d45",
          900: "#773f38",
        },
        bpurple: {
          50: "#f5f5f8",
          100: "#ebebf1",
          200: "#cdcddc",
          300: "#afafc7",
          400: "#74749e",
          500: "#383874",
          600: "#323268",
          700: "#2a2a57",
          800: "#222246",
          900: "#1b1b39",
        },
        como: {
          50: "#f5f8f7",
          100: "#ecf1f0",
          200: "#cfdcd9",
          300: "#b2c7c1",
          400: "#799d93",
          500: "#3f7365",
          600: "#39685b",
          700: "#2f564c",
          800: "#26453d",
          900: "#1f3831",
        },
        bgreen: {
          50: "#f7fef8",
          100: "#effcf2",
          200: "#d6f9de",
          300: "#bdf5c9",
          400: "#8ceda1",
          500: "#5ae579",
          600: "#51ce6d",
          700: "#44ac5b",
          800: "#368949",
          900: "#2c703b",
        },
        bred: {
          50: "#fff8f9",
          100: "#fff1f3",
          200: "#ffdbe2",
          300: "#ffc6d1",
          400: "#ff9bae",
          500: "#ff708b",
          600: "#e6657d",
          700: "#bf5468",
          800: "#994353",
          900: "#7d3744",
        },
        stromboli: {
          50: "#f4f7f7",
          100: "#eaefee",
          200: "#cad8d5",
          300: "#aac1bb",
          400: "#6a9288",
          500: "#2a6355",
          600: "#26594d",
          700: "#204a40",
          800: "#193b33",
          900: "#15312a",
        },
        jade: {
          50: "#f3fbf8",
          100: "#e6f7f0",
          200: "#c1ecda",
          300: "#9be0c3",
          400: "#50c896",
          500: "#05b169",
          600: "#059f5f",
          700: "#04854f",
          800: "#036a3f",
          900: "#025733",
        },
        acapulco: {
          50: "#f9fbfb",
          100: "#f2f8f6",
          200: "#dfede9",
          300: "#cbe1db",
          400: "#a5cbc1",
          500: "#7eb5a6",
          600: "#71a395",
          700: "#5f887d",
          800: "#4c6d64",
          900: "#3e5951",
        },
        "chathams-blue": {
          50: "#f4f7f8",
          100: "#e9eef2",
          200: "#c8d5de",
          300: "#a7bcca",
          400: "#6489a2",
          500: "#22577a",
          600: "#1f4e6e",
          700: "#1a415c",
          800: "#143449",
          900: "#112b3c",
        },
        tuscany: {
          50: "#fcf7f5",
          100: "#f9f0eb",
          200: "#f0d9ce",
          300: "#e7c3b0",
          400: "#d59574",
          500: "#c36839",
          600: "#b05e33",
          700: "#924e2b",
          800: "#753e22",
          900: "#60331c",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
