/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{html,jsx}",
    "./components/**/*.{html,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4c6665",
        primaryHover: "#6a807e",
        secondary: "#dbdad5",
        accent: "#a26d5d",
        accentHover: "#a77e72",
      },
      rotate: {
        270: "270deg",
      },
    },
  },
  plugins: [],
};
