/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        18: "4.5rem", // 18 * 0.25rem = 4.5rem
      },
      zIndex: {
        999: "999",
      },
    },
  },
  plugins: [],
};
