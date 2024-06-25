/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "purple-1": "#7857FF",
        "purple-2": "#1D1928",
        "pink-1": "#FF0073",
        "light-1": "#FFFFFF",
        "light-2": "#808080",
        "light-3": "#626067",
        "dark-1": "#121212",
        "dark-2": "#34303E",
        "blue-1": "#016FD5",
        "home": "[#F0F2F5]",
      },
    },
  },
  plugins: [],
};
