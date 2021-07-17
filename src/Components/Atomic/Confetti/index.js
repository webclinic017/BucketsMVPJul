import React from 'react';
import {useWindowSize} from 'react-use';
import Confetti from 'react-confetti';

const ConfettiComponent = (props) => {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      {...props}
      width={width}
      height={height}
    />
  )
}

export default ConfettiComponent;