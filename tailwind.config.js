/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-text-color": "#FFF5F7FA",
        "custom-blue": "#012643ef",
        "original-bg": "#35485d",
        "original-gradient-02": "#7aebfb",
      },
      screens: {
        xs: "300px",
      },
    },
  },
  plugins: [],
};
