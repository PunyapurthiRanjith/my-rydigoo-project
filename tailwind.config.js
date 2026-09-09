/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rydigoo: {
          teal: "#0d9488",
          indigo: "#4f46e5",
          dark: "#0f172a",
        },
      },
      boxShadow: {
        card: "0 10px 40px -10px rgba(13, 148, 136, 0.25)",
      },
    },
  },
  plugins: [],
};
