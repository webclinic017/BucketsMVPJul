//span used as a container - to be able to apply styling
import React from 'react';
import theme from "../../../Theme"
const Button = ({onClick, title, className, ...props})=>{

  const style = {
    backgroundColor: theme.colors.green,
    borderColor: theme.colors.green,
    boxShadow: theme.shadows.green,
    width: "8rem"
  };

  return (
    <div
      style={style}
      onClick={onClick}
      className={`text-center px-8 py-2 rounded-full border-2 cursor-pointer ${className}`}
    >
      <span
        style={{color:theme.colors.white}}
        className={`text-sm font-bold`}>
        {title}
      </span>
    </div>
  );
}

export default Button;
