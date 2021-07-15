//span used as a container - to be able to apply styling
import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import theme from "../../../Theme";

const Button = ({onClick, title, isProcessing, className, ...props})=>{
  const style = {
    backgroundColor: theme.colors.green,
    borderColor: theme.colors.green,
    boxShadow: theme.shadows.green,
    width: "8rem"
  };

  return (
    <div
      style={style}
      onClick={isProcessing ? ()=>{} : onClick}
      className={`text-center px-8 py-2 rounded-full border-2 cursor-pointer ${className}`}
    >
      {
        isProcessing
          ?
            <PulseLoader size={7} color={theme.colors.white} loading={true} />
          :
            <span
              style={{color: theme.colors.white}}
              className={`text-sm font-bold`}>
              {title}
            </span>
      }
    </div>
  );
}

export default Button;
