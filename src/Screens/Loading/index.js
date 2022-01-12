import React from 'react';
import theme from '../../Theme';
import MoonLoader from "react-spinners/MoonLoader";
import Image from '../../Components/elements/Image';

const Loading = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Image 
          src={require("../../Assets/images/transparentlogo.gif").default}
          width={64}
          height={64}
      />
    </div>
  )
}

export default Loading;