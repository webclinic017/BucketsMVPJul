import React from 'react';
import theme from '../../Theme';

const Loading = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <p
        style={{color: theme.colors.green}}
        className="text-center font-bold text-lg"
      >loading...</p>
    </div>
  )
}

export default Loading;