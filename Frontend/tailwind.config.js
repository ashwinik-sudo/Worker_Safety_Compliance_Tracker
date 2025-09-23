module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "gradient-xy": {
          "0%, 100%": { "background-position": "left top" },
          "50%": { "background-position": "right bottom" },
        },
        "bounce-y": {
          "0%, 100%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-5px)", // Small bounce up
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "gradient-xy": "gradient-xy 15s ease infinite alternate", // Slow, repeating gradient shift
        "bounce-y": "bounce-y 0.5s ease-in-out", // Quick bounce on hover
      },
    },
  },
  plugins: [],
};