import React from 'react';

//props evolve as you progress and you can always add them later
const Input = ({value, onChange, placeholder, className, ...props})=>{
  return (
    <input
      className={`bg-gray-300 rounded-md py-2 px-4 focus:outline-none ${className}`}
      //backtick used when variable used inside string
      value = {value}
      onChange = {onChange}
      placeholder = {placeholder}
    />
  );
}

export default Input;