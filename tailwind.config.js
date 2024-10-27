/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768',
      lg: '1024',
    },
    extend: {
      colors: {
        primaryColor: '#f7aa1d',
        primaryColorLight: '#1e3133',
        secondaryColor: '#121d1e',
        paragraphColor: '#888',
        whiteColor: '#d3d3d3',
      },
    },
  },
  plugins: [],
};
