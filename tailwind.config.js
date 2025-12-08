/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1392ec",
        "primary-hover": "#0e7ac7",
        "background-light": "#f6f7f8",
        "background-dark": "#101a22",
        "text-primary-light": "#111518",
        "text-primary-dark": "#f0f3f4",
        "text-secondary-light": "#617989",
        "text-secondary-dark": "#a0b1c0",
        "border-light": "#dbe1e6",
        "border-dark": "#344556",
        "card-light": "#ffffff",
        "card-dark": "#192734",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}