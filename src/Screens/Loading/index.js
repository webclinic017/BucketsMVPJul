import React from 'react';
import theme from '../../Theme';
import MoonLoader from "react-spinners/MoonLoader";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <MoonLoader size={40} color={theme.colors.green} loading={true} />
    </div>
  )
}

export default Loading;