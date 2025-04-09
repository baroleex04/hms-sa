/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "0.4" }
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        scaleIn: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        slideInLeft: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" }
        },
        slideInRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" }
        },
        pulse: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" }
        }
      },
      opacity: {
        15: "0.15",
        10: "0.10"
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out forwards",
        slideUp: "slideUp 0.6s ease-in-out forwards",
        scaleIn: "scaleIn 0.6s ease-in-out forwards",
        slideInLeft: "slideInLeft 0.6s ease-in-out forwards",
        slideInRight: "slideInRight 0.6s ease-in-out forwards",
        pulse: "pulse 2s infinite ease-in-out"
      }
    }
  },
  plugins: []
}
