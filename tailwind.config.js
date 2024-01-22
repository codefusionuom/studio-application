/** @type {import('tailwindcss').Config} */
module.exports = {
   corePlugins: {
      preflight: false,
     },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: '#root',
  theme: {
    
    extend: {colors: {
      'primary': '#000',
      "bg":"#D9D9D9",
      "btn-success":"#1DC560" ,
      "btn-info":"#0F9AE8",
      "btn-danger":"#E80F0F",
      "btn-warning":"#FFB800",
      "cl-1":"#000000",
      "cl-2":"#707070",
      "cl-4":"#ffffff" 
    },},
  },
  plugins: [],
}

