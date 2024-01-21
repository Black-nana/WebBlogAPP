/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require('daisyui')],
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce'], // Add this line
  },

}
