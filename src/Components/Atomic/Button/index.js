//span used as a container - to be able to apply styling
import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import theme from "../../../Theme";

const Button = ({onClick, title, isProcessing, className, styles, ...props})=>{
  const style = {
    backgroundColor: props.secondary ? theme.colors.lightPurple : theme.colors.tuscany,
    borderColor: props.secondary ? theme.colors.lightPurple : theme.colors.tuscany,
    boxShadow: props.secondary ? theme.shadows.lightPurple : theme.shadows.tuscany,
    ...styles
  };

  return (
    <div
      style={style}
      onClick={isProcessing ? ()=>{} : onClick}
      className={`text-center px-8 py-2 rounded-full border-2 cursor-pointer w-32 ${className}`}
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
