/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  //  corePlugins: {
  //     preflight: false,
  //    },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // important: '#root',
  theme: {
    
    extend: {colors: {
      'primary': '#21179F',
      "bg":"#E5E5E5",
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
})

