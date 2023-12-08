/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'forestBackground': "url('/src/images/forestBg.jpg')",
        'seaBackground': "url('/src/images/seaBg.jpg')",
        'libraryBackground': "url(/src/images/libraryBg.jpg)",
      },
    },
  },
  plugins: [],
}

