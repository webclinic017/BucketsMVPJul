//in tailwind, sm and md stand for sizing specs in small and medium screen sizes respectively
import React from 'react';
import theme from "../../../Theme"

const AddButton = ({onClick, title, className, ...props})=>{

  const style = {
    backgroundColor: theme.colors.lightPurple,
    borderColor: theme.colors.lightPurple,
    boxShadow: theme.shadows.lightPurple,

  };


  return (
  <div
    onClick={onClick}
    style={style}
    className={`mt-4 w-10 sm:w-10 md:w-14 h-10 sm:h-10 md:h-14  rounded-full flex items-center justify-center cursor-pointer ${className}`}
  >



    <span
      style={{color:theme.colors.white}}
      className={`text-sm font-bold`}>
      {title}
    </span>

  </div>

  );
}

export default AddButton;
