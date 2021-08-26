module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        byellow:{    
            '50': '#fffdf2', 
            '100': '#fffbe6', 
            '200': '#fff5bf', 
            '300': '#ffef99', 
            '400': '#ffe34d', 
            '500': '#ffd700', 
            '600': '#e6c200', 
            '700': '#bfa100', 
            '800': '#998100', 
            '900': '#7d6900'    
        },
        bpurple:{
            '50': '#f5f5f8', 
            '100': '#ebebf1', 
            '200': '#cdcddc', 
            '300': '#afafc7', 
            '400': '#74749e', 
            '500': '#383874', 
            '600': '#323268', 
            '700': '#2a2a57', 
            '800': '#222246', 
            '900': '#1b1b39'
        },
        bgreen:{
           
            '50': '#f7fef8', 
            '100': '#effcf2', 
            '200': '#d6f9de', 
            '300': '#bdf5c9', 
            '400': '#8ceda1', 
            '500': '#5ae579', 
            '600': '#51ce6d', 
            '700': '#44ac5b', 
            '800': '#368949', 
            '900': '#2c703b'
        },
        bred:{
          
            '50': '#fff8f9', 
            '100': '#fff1f3', 
            '200': '#ffdbe2', 
            '300': '#ffc6d1', 
            '400': '#ff9bae', 
            '500': '#ff708b', 
            '600': '#e6657d', 
            '700': '#bf5468', 
            '800': '#994353', 
            '900': '#7d3744'
  
        },




      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
