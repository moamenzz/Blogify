import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: { themes: ["light", "dark"] },
};
