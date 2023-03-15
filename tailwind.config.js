/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'gr-default-blue': '#3478FC',
        'gr-blue-opac': '#F0F5FF',
        'warning-gr': '#FCA034',
      }
    },
  },
  plugins: [],
}
